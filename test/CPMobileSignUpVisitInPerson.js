var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('test mobile CP Sign Up via Visit in Person', function() {
  it('User should be able to create account from home detail page via Request Tour with mobile', function(done) {
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
      .wait('input#first_name')
      .scrollTo(0, 1000)
      .type('input#first_name', 'Tester')
      .type('input#last_name', 'Testerovich')
      .type('input#email', 'zip'+(Math.floor((Math.random()*10000000)+1))+'@test.com')
      .type('input#phone', '415-628-5384')
      .type('input#password', 'password')
      .click('input#btnContactSubmit')
      .wait('.gallery-card-mobile.gallery-card-mobile--detail.expanded > div > div > div > div > div > div > h1')


      //.screenshot("/Users/ylayeuski/Desktop/loggedInZap.png")
      .evaluate(function () {
        return document.querySelector('.gallery-card-mobile.gallery-card-mobile--detail.expanded > div > div > div > div > div > div > h1').textContent;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal("We're on it!");
        done();
      })
      .catch(function (error) {
        console.error('Error', error);
      });
    });
});
