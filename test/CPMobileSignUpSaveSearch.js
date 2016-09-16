var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('test mobile CP sign Up via Save search', function() {
  it('User should be able to create account from search result page with mobile via save search', function(done) {
    this.timeout(25000);
    var nightmare = Nightmare({show: true});

    nightmare
      .viewport(1200, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://qawww.ziprealty.com/?smo=true')
      .wait('input#inputZipCode')

      .evaluate(function () {
       document.getElementById('inputZipCode').value = "";})     

      .type('input#inputZipCode', 'Oakland, CA')
      .click('#submitBtn')
      .wait(1000)
      .click('#srSave')
      .wait(1000)
      .click('a.topNavLink')
      .wait('input#first_name')
      .type('input#first_name', 'Tester')
      .type('input#last_name', 'Testerovich')
      .type('input#email', 'zip'+(Math.floor((Math.random()*10000000)+1))+'@test.com')
      .type('input#password', 'password')
      .click('input#btnContactSubmit')
      .wait('a.btn-primary')
      .click('a.btn-primary')
      .wait('li > a#myZip')
      .click('li > a#myZip')
      .wait('div.smPad > h1')
      //.screenshot("/Users/ylayeuski/Desktop/loggedInZap.png")
      .evaluate(function () {
        return document.querySelector('div.smPad > h1').textContent;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal('Welcome, Tester');
        done();
      })
      .catch(function (error) {
        console.error('Error', error);
      });
    });
});