var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Zap V3 login and logout in QA as agent', function() {
  it('Should login as agent and logout successfully', function(done) {
    this.timeout(15000);
    var nightmare = Nightmare({show:true});

    nightmare
      .viewport(1200, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://stgv3.myzap.com')
      .type('input#username', 'ben.burnside@era.com')
      .type('input#password', 'Realogy1$')
      .click('input.btn.btn--positive.full-width')
      .wait('#navTopAgent')
      .click('#navTopAgent')
      .wait(500)
      .click('a#logout')

      .screenshot("/Users/ylayeuski/Desktop/LoginPage.png")
      .evaluate(function () {
        return document.title;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal('Zap Login');
        done();
      })
      .catch(function (error) {
        console.error('This is not Login Page', error);
      });   
    });
});
