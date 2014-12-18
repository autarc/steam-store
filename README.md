Steam Store
===========

An API client for the *[unofficial Steam Storefront][0]* (Big Picture) resource,
which provides methods to retrieve product information from the platform.

_Latest: [0.2.0][1]_


## Info

Features:
* allows app listing, lookup and product search
* supports callbacks and promises


## Getting Started

```js

var SteamStore = require('steam-store');

var store = new SteamStore({
  country:  'DE',
  language: 'en'
});

// store methods to call

```

Examples can be found [here][2].


## API

new SteamStore([options])


### Custom

`.getProducts([Array <String> types][, Function callback])`

`.getProductsLists([Function callback])`

`.getProductsDetails(Array <String|Number> ids [, Function callback])`

`.getProductsDetail(String|Number id [, Function callback])`

`.getSteamAppLink(Number id)`

### Steam

`.steam(String name [Optiona: arguments for the specific resource])`

-  [getAppList][4]
-  [getGenreList][5]
-  [trailerSlideShow][6]
-  [featured][7]
-  [appUserDetails][8]
-  [appDetails][9]
-  [salePage][10]
-  [DLCForApp][11]
-  [checkoutCountryData][12]
-  [storeSearch][13]
-  [packageDetails][14]
-  [featuredCategories][15]
-  [getAppsInCategory][16]
-  [getAppsInGenre][17]


## TODO

- include package overview data
- update documentation
- write tests




[0]: https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI
[1]: https://github.com/Autarc/steam-store/blob/master/CHANGELOG.md
[2]: https://github.com/Autarc/steam-store/blob/master/examples/

[4]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L54
[5]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L54
[6]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L71
[7]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L90
[8]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L108
[9]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L128
[10]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L147
[11]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L166
[12]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L184
[13]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L203
[14]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L222
[15]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L241
[16]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L260
[17]: https://github.com/Autarc/steam-store/blob/master/lib/API-steam.js#L280
