var assert = require("assert"); // node.js core module
var Nightmare = require('nightmare');
var nightmareOptions = {show: true};
var server = 'http://qawww.ziprealty.com';

describe('Sign Up', function(){
  this.timeout(15000);

  describe('click the sign up link in the header', function(){
    it('should see the google sign in button', function(done){

      new Nightmare(nightmareOptions)
        .goto(server+'/')
        .click('.membernav a')
        .click('.jsStateTrigger')
        .click('.jsStateTrigger a')
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
