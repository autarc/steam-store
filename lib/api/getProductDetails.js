/**
 * getProductDetails
 * =================
 *
 *
 */


/**
 * [exports description]
 *
 * @param  {[type]}   ids      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports = function getProductDetails (id, callback) {
  var resource = (this.match(id) === 'package') ? 'packageDetails' : 'appDetails';
  return this.steam(resource, id, callback);
};
