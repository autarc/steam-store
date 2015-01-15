/**
 * Store
 * =====
 *
 *
 */

var Promise = require('bluebird');
var languages = require('languages');
var request = Promise.promisify(require('request'));

var types = {
  'advertising': require('./types/advertising.json'),
  'demo': require('./types/demo.json'),
  'dlc': require('./types/dlc.json'),
  'game': require('./types/game.json'),
  'missing': require('./types/missing.json'),
  'mod': require('./types/mod.json'),
  'movie': require('./types/movie.json')
  // 'package': require('./types/package.json')
};

/**
 * [exports description]
 *
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
var Store = module.exports = function (options) {

  if (!options) {
    options = Object.create(null);
  }

  this.options = {
    // apikey:      options.apikey,
    timeout:  options.timeout  || 1000 * 60 * 5,
    country:  options.country  || 'US',
    language: options.language || 'en'
  };

  this.options.country = this.options.country.toLowerCase();
  this.options.language = languages.getLanguageInfo(this.options.language).name.toLowerCase();

  this.cache = { // set initial data
    'lists': this.options.cache
  };
};

/**
 * [get description]
 *
 * Used for directly calling the Steam API.
 *
 * @param  {[type]}   path     [description]
 * @param  {[type]}   query    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Store.prototype.get = function (path, query, callback) {
  return new Promise(function (resolve, reject) {
    var defaultBase = 'https://store.steampowered.com/api';
    var url = (/^http(s):/).test(path) ? path : defaultBase + path;
    var timeout = this.options.timeout;
    var options = {
      'header': {
        'User-Agent': 'Steam-Store | Unofficial API Client'
      },
      'gzip': true,
      'json': true,
      'url': url
    };

    if (query) {
      options.qs = query;
    }

    request(options).spread(function (res, body) {
      // rating limit reached: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#429
      if (res.statusCode === 429) {
        if (!timeout) {
          return reject(new Error('Request rating limit exceeded!'));
        }
        return setTimeout(function(){
          return this.get(path, query).then(resolve);
        }.bind(this), timeout);
      }
      return resolve(body);

    }.bind(this)).catch(reject);
  }.bind(this)).nodeify(callback);
};

/**
 * [match description]
 *
 * Retrieves the category of the provided product id.
 *
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
Store.prototype.match = function (id) {
  var category = 'unkown'; // '*'
  if (typeof id === 'string') {
    category = 'package';
  } else { // === 'number'
    Object.keys(types).some(function (type) {
      var match = types[type].some(function (lookupId) {
        return lookupId === id;
      });
      if (match) {
        category = type;
      }
      return match;
    });
  }
  // TODO:
  // if (category === 'unknown') {
  //  updateStaticTypeReferences();
  // }
  return category;
};


Store.prototype.steam               = require('./api/steam');
Store.prototype.getProducts         = require('./api/getProducts');
Store.prototype.getProductsLists    = require('./api/getProductsLists');
Store.prototype.getProductsDetails  = require('./api/getProductsDetails');
Store.prototype.getProductDetails   = require('./api/getProductDetails');
Store.prototype.getProductLink      = require('./api/getProductLink');
