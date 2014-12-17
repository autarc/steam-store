/**
 * List Product
 * ============
 *
 * Create a list of all product ids for games and dlcs available in germany.
 */

var SteamStore = require('../index');

var store = new SteamStore({
  country: 'DE',
  language: 'de'
});

store.getProducts(['game', 'dlc']).then(function (products) {
  console.log(products);
});
