/**
 * API - Custom
 * ============
 *
 * Own methods extending the storefront datasets.
 * Abstraction for matching the product list and categories.
 */

var Promise = require('bluebird');

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

var api = exports;

/**
 * [getProducts description]
 * Retrieve information about the products of the selected types,
 * by getting the details from the product ids.
 *
 * @param  {[type]} types   [description]
 * @param  {[type]} calback [description]
 * @return {[type]}         [description]
 */
api.getProducts = function (types, callback) {
  if (!Array.isArray(types)) {
    types = [ // = all
      // 'advertising',
      'demo',
      'dlc',
      'game',
      // 'missing',
      'mod',
      'movie',
      'package'
    ];
  }
  return this.getProductsLists().then(function (lists) {
    return this.getProductsDetails(types.reduce(function (ids, type) {
      if (!lists[type]) {
        return Promise.reject(new Error('Invalid type selected: "' + type + '"'));
      }
      ids.push.apply(ids, lists[type].map(function (app) {
        return app.appid || app.packageid; // product.id
      }));
      return ids;
    }, []));
  }.bind(this))
  .nodeify(callback);
};

/**
 * [getProductsLists description]
 *
 * @return {[type]} [description]
 */
api.getProductsLists = function (callback) {
  if (this.cache.lists) {
    return Promise.resolve(this.cache.lists).nodeify(callback);
  }
  return getAppsLists.call(this).then(function (lists) {
    return getPackagesList.call(this, lists).then(function (list) {
      lists['packages'] = list;
      this.cache.lists = lists;
      return Promise.resolve(lists);
    }.bind(this));
  }.bind(this))
  .nodeify(callback);
};

/**
 * [getAppsLists description]
 *
 * @return {[type]} [description]
 */
function getAppsLists (callback) {
  return this.steam('getAppList').then(function (body) {
    var lists = Object.create(null);
    body.applist.apps.forEach(function (app) {
      var type = match(app.appid);
      if (!lists[type]) {
        lists[type] = [];
      }
      lists[type].push(app);
    });
    return Promise.resolve(lists);
  }).nodeify(callback);
}

/**
 * [getPackagesList description]
 *
 * @return {[type]} [description]
 */
function getPackagesList(){
  // TODO:
  // - check data/handle placeholder
  return Promise.resolve([]);
}

/**
 * [getProductsDetails description]
 *
 * @return {[type]} [description]
 */
api.getProductsDetails = function (ids, callback) {
  return Promise.map(ids, function (id) {
    return this.getProductDetails(id);
  }.bind(this), { 'concurrency': 1 })
  .nodeify(callback);
};

/**
 * [getProductDetails description]
 *
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
api.getProductDetails = function (id, callback) {
  var resource = (match(id) === 'package') ? 'getPackageDetails' : 'getAppDetails';
  return this.steam(resource, id, callback);
};

/**
 * [match description]
 *
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function match (id) {
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
}
