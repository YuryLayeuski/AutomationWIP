var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

var local = 'http://ninjamagic.hq.office.ziprealty.com:8080/longisland';
//var enviro = local;
var enviro = 'https://qawww5.ziprealty.com';
var agentWebsite = '/ERA-Cornerstone-Realty-64c/Ben-Burnside-185667a';
var companyWebsite = '/ERA-Cornerstone-Realty-64c';
var picDir = '/Users/ylayeuski/Desktop/';

describe('Local Insights Carousel', function() {
  describe('Load up Agent Website of Ben Burnside', function() {
    it('should find local insight on agent website and click', function (done) {
      this.timeout(15000);
      var nightmare = Nightmare({
        show:true,
        'webPreferences':{  //Lets clear the session
          partition: 'nopersist'
        }
      });

      nightmare
        .viewport(1400, 1000)
        .goto(enviro + agentWebsite)
        .evaluate(function () {
          function findPos(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
              do {
                curtop += obj.offsetTop;
              } while (obj = obj.offsetParent);
              return [curtop];
            }
          }
          window.scroll(0,findPos(document.getElementById("nhood-widget")));
        })
        .wait()
        //.screenshot(picDir + 'localInsightAgentWesbiteLoaded.jpg')
        .evaluate(function() {
          document.querySelector('#nhood-widget').contentWindow.document.body.querySelector('.js-insight-cta').click();
        })
        .wait()
        //.screenshot(picDir + 'localInsightAgentWesbiteClicked.jpg')
        .evaluate(function() {
          return document.querySelector('#nhood-widget').contentWindow.document.body.querySelector('.js-insight-cta').disabled;
        })
        .end()
        .then(function (result) {
          expect(result).to.equal(true); //If there was a local insight or there was one already clicked we should have the button disabled
          done();
        })
        .catch(function (error) {
          console.error('The local insight button clicked should have been disabled', error);
        });
    });
  });

  describe('Load up Company Website of Cornerstone', function() {
    it('should find local insight on company website and click', function (done) {
      this.timeout(15000);
      var nightmare = Nightmare({
        show:true,
        'webPreferences':{  //Lets clear the session
          partition: 'nopersist'
        }
      });

      nightmare
        .viewport(1400, 1000)
        .goto(enviro + companyWebsite)
        .evaluate(function () {
          function findPos(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
              do {
                curtop += obj.offsetTop;
              } while (obj = obj.offsetParent);
              return [curtop];
            }
          }
          window.scroll(0,findPos(document.getElementById("nhood-widget")));
        })
        .wait()
        //.screenshot(picDir + 'localInsightCompanyWesbiteLoaded.jpg')
        .evaluate(function() {
          document.querySelector('#nhood-widget').contentWindow.document.body.querySelector('.js-insight-cta').click();
        })
        .wait()
        //.screenshot(picDir + 'localInsightCompanyWesbiteClicked.jpg')
        .evaluate(function() {
          return document.querySelector('#nhood-widget').contentWindow.document.body.querySelector('.js-insight-cta').disabled;
        })
        .end()
        .then(function (result) {
          expect(result).to.equal(true); //If there was a local insight or there was one already clicked we should have the button disabled
          done();
        })
        .catch(function (error) {
          console.error('The local insight button clicked should have been disabled', error);
        });
    });
  });
});