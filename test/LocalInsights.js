var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

var enviro = 'https://qawww5.ziprealty.com';
var picDir = '/Users/ylayeuski/Desktop/';

describe('Search for a city with local insights and verify there\'s one', function() {
  it('should search for Arlington, TX and check that insights exist', function(done) {
    this.timeout(20000);
    var nightmare = Nightmare({
      show:true,
      'webPreferences':{  //Lets clear the session
        partition: 'nopersist'
      }
    });

    nightmare
      .viewport(1400, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto(enviro)
      .click('form[action*="/homes/for-sale/search/locate?src=hp"] [name="location"]')
      .type('form[action*="/homes/for-sale/search/locate?src=hp"] [name="location"]', '') //clear the field if it's pre-populated
      .type('form[action*="/homes/for-sale/search/locate?src=hp"] [name="location"]', 'arlington, tx')
      .click('a[href="Arlington, TX"]')
      .wait('.js-insight-cta')
      //.screenshot(picDir+'localInsightsWebsite.png')
      .click('.js-insight-cta')
      .click('div.media.mb-10.mt-10 div.media__content div.cf div.bfc.pr-10 div a')
      .wait('.agent-contact')
      //.screenshot(picDir+'localInsightAgentProfile.png')
      .back()
      .wait('.js-insight-cta')
      .evaluate(function() {
        return document.querySelector('.js-insight-cta').disabled;
      })
      .end()
      .then(function(result) {
        expect(result).to.exist; //If there was a local insight or there was one already clicked we should have the button disabled
        done();
      })
      .catch(function(error) {
        console.error('The local insight button clicked should have been disabled', error);
      });
  });
});