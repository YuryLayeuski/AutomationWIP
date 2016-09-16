var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('test mobile CP Sign Up via Save Home', function() {
  it('User should be able to create account from home detail page via Save Home with mobile', function(done) {
    this.timeout(25000);
    var nightmare = Nightmare({show: true});

    nightmare
      .viewport(1200, 1100)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://qawww.ziprealty.com/?smo=true')
      .wait('input#inputZipCode')

      .evaluate(function () {
       document.getElementById('inputZipCode').value = "";})     

      .type('input#inputZipCode', 'Oakland, CA')
      .click('#submitBtn')
      .wait(1000)
      .click('img#homephoto0')
      .wait('#bottomFixedNav #btnSave')
      .click('#bottomFixedNav #btnSave')
      .wait(1000)
      .click('.zipOverlayPanel a.topNavLink')
      .wait(1000)
      .type('.fsb_body input#first_name', 'Tester')
      .type('.fsb_body input#last_name', 'Testerovich')
      .type('.fsb_body input#email', 'zip'+(Math.floor((Math.random()*10000000)+1))+'@test.com')
      .type('.fsb_body input#password', 'password')
      .click('.fsb_body input#btnContactSubmit')
      .wait('div.smPad .t-center > h1')

      //.screenshot("/Users/ylayeuski/Desktop/loggedInZap.png")
      .evaluate(function () {
        return document.querySelector('div.smPad .t-center > h1').textContent;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal("Your home has been saved!");
        done();
      })
      .catch(function (error) {
        console.error('Error', error);
      });
    });
});





