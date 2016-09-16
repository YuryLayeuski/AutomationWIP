var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Verify that "no results found" is not shown when a city/neighborhood is selected', function() {
  it('Login and check that "no results found" doesn\'t show up if we select another city/neighborhood', function(done) {
    this.timeout(20000);
    var nightmare = Nightmare();

    nightmare
      .viewport(1200, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://qav3.myzap.com')
      .type('form[action*="/login/j_spring_security_check"] [name=username]', 'ben.burnside@era.com')
      .type('form[action*="/login/j_spring_security_check"] [name=password]', 'Realogy1$')
      .click('form[action*="/login/j_spring_security_check"] [type=submit]')
      .wait('#navTopQuickAdd')
      .click('#navTopQuickAdd')
      .click('a[href="#overlay-add-local-insight"]')
      .wait('input[name="city-neighborhood"]')
      .click('input[name="city-neighborhood"]')
      .type('input[name="city-neighborhood"]', 'San')
      .wait('.autocomplete-suggestions .autocomplete-suggestion')
      .click('.autocomplete-suggestions .autocomplete-suggestion[data-index="0"]')
      .screenshot(__dirname + "/clickOnCityOrNeighborhood.png")
      .wait(500)
      .click('#headline')
      .type('#headline', '')
      .type('#headline', 'Nightmare automated testing')
      .click('#city')
      .evaluate(function(){
        return document.querySelector('#city-results > span').classList.contains('hide');
      })
      .end()
      .then(function (visible) {
        expect(visible).to.be.true;
        done();
      })
      .catch(function (error) {
        console.error('Something went wrong', error);
      });
  });
});
