var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Creating account thru hamburger menu via Saved Searches on mobile web', function() {
  it('User should be able to create account thru hamburger menu via Saved Searches', function(done) {
    this.timeout(25000);
    var nightmare = Nightmare({show: true});

    nightmare
      .viewport(1200, 1100)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://qawww.ziprealty.com/?smo=true')
      .wait('a#myZip')  
      .click('a#myZip')    //click on hamburger menu
      .wait('#myZSS > a')    
      .click('#myZSS > a')   //click on 'Saved Searches' link
      .wait(1000) 
      .click('a.topNavLink')     //click on Sign Up link(right upper corner)
      .wait('input#first_name')
      .type('input#first_name', 'Tester')
      .type('input#last_name', 'Testerovich')
      .type('input#email', 'zip'+(Math.floor((Math.random()*10000000)+1))+'@test.com')
      .type('input#password', 'password')
      .type('select#metro', 'Oakland')
      .click('input#btnContactSubmit')
      .wait(1000)
      .click('a.btn-primary')
      .wait('a#myZip')
      .click('a#myZip')

      .wait(1000)

      .evaluate(function () {
        var x = document.querySelector('#navcontent div.menu_body div.smPad>h1').textContent;
        var y = document.querySelector('a#signout').textContent;

        var results = {
          user: x,
          button: y
        }

          return results;

      })
      .end()
      .then(function (results) {
        expect(results.user).to.equal('Welcome, Tester');
        expect(results.button).to.equal('Sign Out');
        done();
      })
      .catch(function (error) {
        console.error('Error', error);
      });
    });
});


