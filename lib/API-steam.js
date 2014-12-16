/**
 * API - Steam
 * ===========
 *
 * called internaly to maintain context and avaoid collision.
 *
 * The original file with the discovered endpoints is available at:
 *
 *  https://github.com/SteamDatabase/SteamTracking/blob/master/API/Storefront.txt
 *
 * Currently not used:
 *  - /messages/?cc=%s&l=%s&%s
 *  - /bpeventbackground/?l=%s&cc=%s
 *  - /addtocart/?cc=%s&l=%s
 *  - /addtowishlist/?cc=%s&l=%s
 *  - /getfundwalletinfo/?cc=%s&l=%s
 *  - /gettransactionstatus/?cc=%s&l=%s
 *  - /finalizetransaction/?cc=%s&l=%s
 *  - /gettransactionprice/?cc=%s&l=%s
 *  - /initializetransaction/?cc=%s&l=%s
 *  - /begincheckout/?cc=%s&l=%s
 *  - /setcouponforcartlineitem/?cc=%s&l=%s
 *  - /removefromcart/?cc=%s&l=%s
 *  - /addwalletcredittocart/?cc=%s&l=%s
 *  - /getcart/?cc=%s&l=%s&cart=%lld
 *  - /createagegatecookie/?month=%d&day=%d&year=%d
 *  - /parseagegatecookie/?cookie=%s
 */

var Promise = require('bluebird');

var steam = {

  /**
   * [getAppList description]
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getAppList: function (callback) {
    return this.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/', {
      'cc': this.options.country,
      'l': this.options.language
    })
    .nodeify(callback);
  },

  /**
   * [getGenres description]
   *
   * @return {[type]} [description]
   */
  getGenres: function (callback) {
    return this.get('/getgenrelist' /** , {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      // %s/api/getgenrelist/
      console.log(body);
    })
    .nodeify(callback);
  },

  /**
   * [getTrailerSlideShow description]
   *
   * @return {[type]} [description]
   */
  getTrailerSlideShow: function (callback) {
    return this.get('/trailerslideshow' /** , {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      // %s/api/trailerslideshow/
      console.log(body);
    })
    .nodeify(callback);
  },

  /**
   * [getCurrentFeatured description]
   *
   * @return {[type]} [description]
   */
  getCurrentFeatured: function (callback) {
    return this.get('/featured' /** , {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      // %s/api/featured/
      console.log(body)
    })
    .nodeify(callback);
  },


  /**
   * [getAppUserDetails description]
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  getAppUserDetails: function (appid, callback) {
    return this.get('/appuserdetails', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'v': 1,
      'appids': appid
    }).then(function (body) {
      // %s/api/appuserdetails/?appids=%u&cc=%s&l=%s&v=1
      console.log(body);
    })
    .nodeify(callback);
  },

  /**
   * [getAppDetails description]
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  getAppDetails: function (appid, callback) {
    return this.get('/appdetails', {
      'cc': this.options.country,
      'l': this.options.language,
      'appids': appid
    }).then(function (body) {
      var data = body[appid].data;
      return Promise.resolve(data);
    })
    .nodeify(callback);
  },

  /**
   * [getSalePage description]
   *
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getSalePage: function (id, callback) {
    return this.get('/salepage', {
      // 'cc': this.options.country,
      // 'l': this.options.language
     'id': id
    }).then(function (body) {
      // %s/api/salepage/?id=%s
      console.log('getSalePage - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getDLCForApp description]
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  getDLCForApp: function (appid, callback) {
    return this.get('/dlcforapp', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'appid': appid
    }).then(function (body) {
      // %s/api/dlcforapp/?appid=%u
      console.log('getDLCForApp - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getCountryData description]
   *
   * @return {[type]} [description]
   */
  getCountryData: function (callback) {
    return this.get('/checkoutcountrydata' /**, {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      // %s/api/checkoutcountrydata/
      console.log('getCountryData - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getStoreSearch description]
   *
   * @param  {[type]}   term     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getStoreSearch: function (term, callback) {
    return this.get('/storesearch', {
      // 'cc': this.options.country,
      // 'l': this.options.language
      'term': term
    }).then(function (body) {
      // %s/api/storesearch/?term=%s
      console.log('getStoreSearch - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getPackageDetails description]
   *
   * @param  {[type]} packageid [description]
   * @return {[type]}           [description]
   */
  getPackageDetails: function (packageid, callback) {
    return this.get('/packagedetails', {
      'cc': this.options.country,
      'l': this.options.language,
      'packageids': packageid
    }).then(function (body) {
      var data = body[packageid].data;
      return Promise.resolve(data);
    })
    .nodeify(callback);
  },

  /**
   * [getFeaturedCategories description]
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getFeaturedCategories: function (callback) {
    return this.get('/featuredcategories' /** ,{
      'cc': this.options.country,
      'l': this.options.language
      'extra': <controller>
    } **/).then(function (body) {
      // %s/api/featuredcategories/?extra=controller
      console.log('getFeaturedCategories - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getAppsInCategory description]
   *
   * @param  {[type]} category [description]
   * @return {[type]}          [description]
   */
  getAppsInCategory: function (category, callback) {
    return this.get('/getappsincategory', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'category': category
    }).then(function (body) {
      // %s/api/getappsincategory/?category=%s
      console.log('getApsInCategory - ', body)
      process.exit();
    })
    .nodeify(callback);
  },

  /**
   * [getAppsInGenre description]
   *
   * @param  {[type]}   genre    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getAppsInGenre: function (genre, callback) {
    return this.get('/getappsingenre', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
     'genre': genre
   }).then(function (body) {
      // %s/api/getappsingenre/?genre=%s
      console.log('getAppsInGenre - ', body)
      process.exit();
    })
    .nodeify(callback);
  }

};

/**
 * [exports description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
module.exports = function (name /** ... args ... **/) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (typeof steam[name] === 'function') {
    return steam[name].apply(this, args);
  }
  return Promise.reject('Invalid function name: "' + name + '"');
};
