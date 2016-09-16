var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Verify requests screens', function() {
  it('Make sure that the displayed amount of results matches the amount displayed on screen when filtering by Status or Time Frame', function(done) {
    this.timeout(20000);
    var nightmare = Nightmare();

    nightmare
      .viewport(1200, 1000)
      .goto('http://qav3.myzap.com')
      .type('form[action*="/login/j_spring_security_check"] [name=username]', 'ben.burnside@era.com')
      .type('form[action*="/login/j_spring_security_check"] [name=password]', 'Realogy1$')
      .click('form[action*="/login/j_spring_security_check"] [type=submit]')
      .wait('#navTopQuickAdd')
      .click('#navTopQuickAdd')
      .click('a[href="#business"]')
      .wait('#nav-business')
      .click("#showing-appointments")
      .wait('#jsResults .list-container')
      .screenshot(__dirname + "/beforeStatusChange.png")
      .select('#jsStatus', 'Scheduled')
      .wait(1000) //let's wait and hope the API has returned the data in a second
      .screenshot(__dirname + "/afterStatusChange.png")
      .evaluate(function() {
        var results = {};
        results.expected = parseInt(document.querySelector('#jsTotal').textContent);
        results.actual = document.querySelectorAll('#jsResults .list-container').length;

        return results;
      })
      .end()
      .then(function (results) {
        expect(results.expected).to.equal(results.actual);
        done();
      })
      .catch(function (error) {
        console.error('Something went wrong', error);
      });
  });
});
