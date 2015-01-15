/**
 * getProductsLists
 * ================
 *
 *
 */

var Promise = require('bluebird');


/**
 * [exports description]
 *
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports = function getProductsLists (callback) {
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
      var type = this.match(app.appid);
      if (!lists[type]) {
        lists[type] = [];
      }
      lists[type].push(app);
    }, this);
    return Promise.resolve(lists);
  }.bind(this)).nodeify(callback);
}

/**
 * [getPackagesList description]
 *
 * @return {[type]} [description]
 */
function getPackagesList (lists) {
  // TODO:
  // - repalce placeholder
  return Promise.resolve([]);
}
