/**
 * getProducts
 * ===========
 *
 *
 */

var JSONStream = require('JSONStream');
var Promise = require('bluebird');


/**
 * [exports description]
 *
 * Retrieve information about the products of the selected types,
 * by getting the details from the product ids.
 *
 * @param  {[type]}   types      [description]
 * @param  {[type]}   streamable [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
module.exports = function getProducts (types, streamable, callback) {
  if (!Array.isArray(types)) {
    types = [types];
  }
  if (!types.length) {
    types = [ // = all (withouth advertising + missing)
      'demo',
      'dlc',
      'game',
      'mod',
      'movie',
      'unknown',
      'package'
    ];
  }
  if (typeof streamable === 'boolean' && streamable) {
    return getProductsStream.call(this, types);
  }
  return getProductsPromise.call(this, types).nodeify(callback);
};

/**
 * [getProductsStream description]
 *
 * @param  {[type]} types [description]
 * @return {[type]}       [description]
 */
function getProductsStream (types) {
  var stream = JSONStream.stringify(false);
  this.getProductsLists().then(function (lists) {
    this.getProductsDetails(selectProducts(types, lists), true)
        .pipe(JSONStream.parse())
        .pipe(stream);
  }.bind(this));
  return stream;
}

/**
 * [getProductsPromise description]
 *
 * @param  {[type]} types [description]
 * @return {[type]}       [description]
 */
function getProductsPromise (types) {
  return this.getProductsLists().then(function (lists) {
    return this.getProductsDetails(selectProducts(types, lists));
  }.bind(this));
}

/**
 * [filterTypes description]
 *
 * @param  {[type]} types [description]
 * @param  {[type]} lists [description]
 * @return {[type]}       [description]
 */
function selectProducts (types, lists) {
  return types.reduce(function (ids, type) {
    if (!lists[type]) {
      return Promise.reject(new Error('Invalid type selected: "' + type + '"'));
    }
    ids.push.apply(ids, lists[type].map(function (app) {
      return app.appid || app.packageid; // product.id
    }));
    return ids;
  }, []);
}
