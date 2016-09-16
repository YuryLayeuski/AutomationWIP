var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line
var qa = 'http://qawww5.ziprealty.com';

describe('Distinctive Properties', function() {
  it('Theme should set when user is coming from Distinctive Property homepage', function(done) {
    this.timeout(10000);
    var nightmare = Nightmare({show: true});

    nightmare
      .viewport(1400, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto(qa+'/distinctive-properties')
      .click('form[action*="/homes/for-sale/search/locate?src=distinctive-lp"] [name="location"]')
      .type('form[action*="/homes/for-sale/search/locate?src=distinctive-lp"] [name="location"]', '') //clear the field if it's pre-populated
      .type('form[action*="/homes/for-sale/search/locate?src=distinctive-lp"] [name="location"]', 'Gillette, WY')
      .click('.btn-primary--search')
      .wait('.luxury-page')
      //.screenshot("/Users/ylayeuski/Desktop/dproperties.jpg")
      .evaluate(function(){
        return document.querySelector('.luxury-page');
      })
      .end()
      .then(function(result){
        expect(result).to.exist; //If there was a local insight or there was one already clicked we should have the button disabled
        done();
      })
      .catch(function (error) {
        console.error('The Distinctive Property theme could not be set...', error);
      });
  });
});
