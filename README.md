Steam Store
===========

An API client for the *[unofficial Steam Storefront][0]* (Big Picture) resource,
which provides methods to retrieve product information from the platform.

_Latest: [0.2.0][1]_


## Info

* allows app listing, lookup and product search
* supports callbacks and promises


## Getting Started

```js

var SteamStore = require('steam-store');

var store = new SteamStore({
  country:  'DE',
  language: 'en'
})

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

### Steam

`.steam(String name [Optiona: arguments for the specific resource])`

-  getAppList
-  getGenreList
-  trailerSlideShow
-  featured
-  appUserDetails
-  appDetails
-  salePage
-  DLCForApp
-  checkoutCountryData
-  storeSearch
-  packageDetails
-  featuredCategories
-  getAppsInCategory
-  getAppsInGenre


## TODO

- include package overview data
- update documentation
- write tests


[0]: https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI
[1]: https://github.com/Autarc/steam-store/blob/master/CHANGELOG.md
[2]: https://github.com/Autarc/steam-store/blob/master/examples/
