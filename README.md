Steam Store
===========

An API client for the *[unofficial Steam Storefront][0]* (Big Picture) resource,
which provides methods to retrieve product information from the platform.

_Latest: [0.4.0][1]_


## Info

Features:
* allows app listing, lookup and product search
* usable with promises, stream and callbacks


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

Available options for the store settings:
* timeout - delay in ms to wait, in case the limit (~ 200 per 5 minutes) is reached | default: 5min
* country - country code (US, GB, DE, ...) for the specific region, e.g. currency and exclusives | default: US
* language - language of the descriptions


### Custom

`.getProducts([String|Array <String> types][, Booelan streamable][, Function callback])`

`.getProductsLists([Function callback])`

`.getProductsDetails(Array <String|Number> ids [, Boolean streamable][, Function callback])`

`.getProductsDetail(String|Number id [, Function callback])`

`.getProductLink(Number|String id)`

### Steam

`.steam(String name [optional: arguments for the specific resource])`

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

[4]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L54
[5]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L54
[6]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L71
[7]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L90
[8]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L108
[9]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L128
[10]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L147
[11]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L166
[12]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L184
[13]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L203
[14]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L222
[15]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L241
[16]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L260
[17]: https://github.com/Autarc/steam-store/blob/master/lib/api/steam.js#L280
