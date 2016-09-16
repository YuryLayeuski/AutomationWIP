var assert = require("assert"); // node.js core module
var Nightmare = require('nightmare');
var nightmareOptions = {show: true};
var server = 'http://qawww.ziprealty.com';

describe('Desktop Search Filters reset', function(){
  this.timeout(15000);

  describe('set one of the fancy select pulldowns, then reset form', function(){
    it('visible selection should return to default', function(done){

      new Nightmare(nightmareOptions)
        .goto(server+'/homes-for-sale/search-results/oakland/detailed')
        .click('#main-search-cont .cs-select-container')
        .evaluate(function() {
          var options = document.querySelector('.cs-select').querySelectorAll('.cs-options ul li')
          options[5].click();
        })
        .click('#advanced-search-link')
        .wait('#clearPS')
        .click('#clearPS')
        .evaluate(function() {
          return document.querySelector('.cs-select .cs-options ul li').classList.contains('cs-selected');
        })
        .end()
        .run(function(error,result) {
          if(error) {
            console.log('ERROR')
            console.log(error)
          }
          console.log(result);
          assert.equal(result, true);
          done();
        });

    })
  })
});
