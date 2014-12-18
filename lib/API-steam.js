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
  getAppList: function(){
    return this.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/', {
      'cc': this.options.country,
      'l': this.options.language
    });
  },

  /**
   * [getGenres description]
   *
   * Pattern: %s/api/getgenrelist/
   *
   * @return {[type]} [description]
   */
  getGenreList: function(){
    return this.get('/getgenrelist' /** , {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      console.log('getGenreList - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getTrailerSlideShow description]
   *
   * Pattern: %s/api/trailerslideshow/
   *
   * @return {[type]} [description]
   */
  trailerSlideShow: function(){
    return this.get('/trailerslideshow' /** , {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      console.log('trailerSlideShow - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getCurrentFeatured description]
   *
   * Get information about currently featured products.
   *
   * Pattern: %s/api/featured/
   *
   * @return {[type]} [description]
   */
  featured: function(){
    return this.get('/featured', {
      'cc': this.options.country,
      'l': this.options.language
    }).then(function (body) {
      console.log('featured - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [appUserDetails description]
   *
   * Pattern: %s/api/appuserdetails/?appids=%u&cc=%s&l=%s&v=1
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  appUserDetails: function (appid) {
    return this.get('/appuserdetails', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'v': 1,
      'appids': appid
    }).then(function (body) {
      console.log('appUserDetails - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getAppDetails description]
   *
   * Pattern: %s/api/appdetails/?appids=%u
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  appDetails: function (appid) {
    return this.get('/appdetails', {
      'cc': this.options.country,
      'l': this.options.language,
      'appids': appid
    }).then(function (body) {
      var data = body[appid].data;
      if (typeof data === 'object') {
        data.steam_applink = this.getSteamAppLink(appid);
      }
      return Promise.resolve(data);
    }.bind(this));
  },

  /**
   * [getSalePage description]
   *
   * Pattern: %s/api/salepage/?id=%s
   *
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  salePage: function (id) {
    return this.get('/salepage', {
      'cc': this.options.country,
      'l': this.options.language,
      'id': id
    }).then(function (body) {
      console.log('salePage - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getDLCForApp description]
   *
   * Pattern: %s/api/dlcforapp/?appid=%u
   *
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  DLCForApp: function (appid) {
    return this.get('/dlcforapp', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'appid': appid
    }).then(function (body) {
      console.log('DLCForApp - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getCountryData description]
   *
   * Pattern: %s/api/checkoutcountrydata/
   *
   * @return {[type]} [description]
   */
  checkoutCountryData: function(){
    return this.get('/checkoutcountrydata' /**, {
      'cc': this.options.country,
      'l': this.options.language
    } **/).then(function (body) {
      console.log('checkoutCountryData - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getStoreSearch description]
   *
   * Pattern: %s/api/storesearch/?term=%s
   *
   * @param  {[type]}   term     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  storeSearch: function (term) {
    return this.get('/storesearch', {
      // 'cc': this.options.country,
      // 'l': this.options.language
      'term': term
    }).then(function (body) {
      var items = body.items;
      return Promise.resolve(items);
    });
  },

  /**
   * [getPackageDetails description]
   *
   * Pattern: %s/api/packagedetails/?packageids=%u
   *
   * @param  {[type]} packageid [description]
   * @return {[type]}           [description]
   */
  packageDetails: function (packageid) {
    return this.get('/packagedetails', {
      'cc': this.options.country,
      'l': this.options.language,
      'packageids': packageid
    }).then(function (body) {
      var data = body[packageid].data;
      return Promise.resolve(data);
    });
  },

  /**
   * [getFeaturedCategories description]
   *
   * Pattern: %s/api/featuredcategories/?extra=controller
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  featuredCategories: function(){
    return this.get('/featuredcategories', {
      'cc': this.options.country,
      'l': this.options.language
      // 'extra': <controller>
    }).then(function (body) {
      console.log('featuredCategories - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getAppsInCategory description]
   *
   * Pattern: %s/api/getappsincategory/?category=%s
   *
   * @param  {[type]} category [description]
   * @return {[type]}          [description]
   */
  getAppsInCategory: function (category) {
    return this.get('/getappsincategory', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
      'category': category
    }).then(function (body) {
      console.log('getAppsInCategory - ', body)
      return Promise.resolve(body);
    });
  },

  /**
   * [getAppsInGenre description]
   *
   * Pattern: %s/api/getappsingenre/?genre=%s
   *
   * @param  {[type]}   genre    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getAppsInGenre: function (genre) {
    return this.get('/getappsingenre', {
      // 'cc': this.options.country,
      // 'l': this.options.language,
     'genre': genre
   }).then(function (body) {
      console.log('getAppsInGenre - ', body)
      return Promise.resolve(body);
    });
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
  var callback = (typeof args[args.length-1] === 'function') ? args.pop() : null;
  if (typeof steam[name] === 'function') {
    return steam[name].apply(this, args).nodeify(callback);
  }
  return Promise.reject('Invalid function name: "' + name + '"');
};
