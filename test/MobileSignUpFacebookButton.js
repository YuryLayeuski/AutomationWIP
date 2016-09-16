var assert = require("assert"); // node.js core module
var Nightmare = require('nightmare');
var nightmareOptions = {show: true};
var server = 'http://qawww.ziprealty.com';

describe('Sign Up Mobile', function(){
  this.timeout(15000);

  describe('click the sign in link in hamburger menu, then sign up', function(){
    it('should see the facebook sign in button', function(done){

      new Nightmare(nightmareOptions)
        .goto(server+'/?smo=true')
        .click('.js-menu')  //Click on hamburger menu
        .wait('#signin')
        .click('#signin')   //Click on Sign In/Sign Up link
        .wait('.topNavLink')
        .click('.topNavLink')   //Click Sign Up link (right upper corner)
        .wait('#metro')
        .evaluate(function() {
          return document.querySelector('a.btn-facebook');
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
