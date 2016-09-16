var assert = require("assert"); // node.js core module
var Nightmare = require('nightmare');
var nightmareOptions = {show: true};
var server = 'http://qawww.ziprealty.com';

describe('Sign Up Mobile', function(){
  this.timeout(15000);

  describe('click the sign in link in hamburger menu, then sign up', function(){
    it('should see the facebook sign in button', function(done){

      new Nightmare(nightmareOptions)
        .viewport(1200, 1100)
        .goto(server+'/?smo=true')
        .click('.js-menu')  //Click on hamburger menu
        .wait('#signin')
        .click('#signin')   //Click on Sign In/Sign Up link
        .wait('.topNavLink')
        .wait(5000)
        .click('#google-customBtn')   //Click Sign Up link (right upper corner)
        .wait(5000)
        .type('#Email', 'yuryzaplabs@gmail.com')
        .wait(5000)


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
