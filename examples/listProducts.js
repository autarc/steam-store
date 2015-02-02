/**
 * List Product
 * ============
 *
 * Create a list of all mods available in germany, using the streaming interface
 * to handle each product as it got received.
 *
 * A promisified handler can be invoke by setting neglecting the second argument.
 *
 * store.getProducts('mod').then(function (products) {
 *
 * });
 */

var SteamStore = require('../index');
var JSONStream = require('JSONStream');

var store = new SteamStore({
  country: 'DE',
  language: 'de'
});

store.getProducts('mod', true)
     .pipe(JSONStream.parse())
     .on('data', function (product) {
        console.log(product.name);
      })
     .on('end', function(){
      console.log('END')
     });
