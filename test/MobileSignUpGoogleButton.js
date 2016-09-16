var assert = require("assert"); // node.js core module
var Nightmare = require('nightmare');
var nightmareOptions = {show: true};
var server = 'http://qawww.ziprealty.com';

describe('Sign Up Mobile', function(){
  this.timeout(15000);

  describe('click the sign in link in hamburger menu, then sign up', function(){
    it('Uesr should see the google sign in button @wip', function(done){

      new Nightmare(nightmareOptions)
        .goto(server+'/?smo=true')
        .click('.js-menu')
        .wait('#signin')
        .click('#signin')
        .wait('.topNavLink')
        .click('.topNavLink')
        .wait('#metro')
        .evaluate(function() {
          return document.getElementById('google-customBtn');
        })
        .end()
        .run(function(error,result) {
          if(error) {
            console.log('ERROR')
            console.log(error)
          }
          console.log(result)
          assert.notEqual(result, null);
          done();
        });

    })
  })
});

