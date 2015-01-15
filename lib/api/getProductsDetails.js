/**
 * getProductsDetails
 * ==================
 *
 *
 */

var JSONStream = require('JSONStream');
var Promise = require('bluebird');


/**
 * [exports description]
 *
 * @param  {[type]}   ids        [description]
 * @param  {[type]}   streamable [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
module.exports = function getProductsDetails (ids, streamable, callback) {
  if (typeof streamable === 'boolean' && streamable) {
    return getProductsDetailsStream.call(this, ids);
  }
  return getProductsDetailsPromise.call(this, ids).nodeify(callback);
};

/**
 * [getProductsDetailsStream description]
 *
 * @param  {[type]} ids [description]
 * @return {[type]}     [description]
 */
function getProductsDetailsStream (ids) {
  var stream = JSONStream.stringify(false);
  Promise.each(ids, function (id) {
    return this.getProductDetails(id).then(function (detail) {
      if (detail) {
        stream.write(detail);
      }
      return Promise.resolve();
    });
  }.bind(this));
  return stream;
}

/**
 * [getProductsDetailsPromise description]
 *
 * @param  {[type]} ids [description]
 * @return {[type]}     [description]
 */
function getProductsDetailsPromise (ids) {
  return Promise.map(ids, function (id) {
    return this.getProductDetails(id);
  }.bind(this), { 'concurrency': 1 })
  .then(function(details) {
    details = details.filter(function (detail) {
      return detail;
    });
    return Promise.resolve(details);
  });
}
