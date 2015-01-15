/**
 * Search Apps
 * ===========
 *
 * Search for applications for a specific term and get all details for them.
 */

var SteamStore = require('../index');

var store = new SteamStore();

var searchTerm = 'Creed';


store.steam('storeSearch', searchTerm).then(function (results) {
  results = results.map(function (result) {
    return result.id;
  });
  store.getProductsDetails(results).then(function (details) {
    console.log(details);
  });
});
