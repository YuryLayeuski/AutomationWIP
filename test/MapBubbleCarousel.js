var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

var enviro = 'http://qawww.ziprealty.com';
var metroSearch = '/homes-for-sale/list/oakland/by-city/Oakland,CA-6449/mapped';
var picDir = '/Users/ylayeuski/Desktop/';

describe('map', function() {
  describe('Load up Oakland,CA', function() {
    it('should load up Oakland, CA map result', function (done) {
      this.timeout(15000);
      var nightmare = Nightmare({
        show:true,
        'webPreferences':{  //Lets clear the session
          partition: 'nopersist'
        }
      });

      nightmare
        .viewport(1400, 1000)
        .useragent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36')
        .goto(enviro + metroSearch)
        .wait('.city-cluster-small')
        //.screenshot(picDir + 'mapPic.jpg')
        .evaluate(function () {
          return document.querySelectorAll('.city-cluster-small').length;
        })
        .end()
        .then(function (result) {
          //console.log(result);
          expect(result).to.be.at.least(1);
          done();
        })
        .catch(function (error) {
          console.error('Error: Result should be at least 1', error);
        });
    });
  });
  describe('Click on a random map cluster from the available ones', function() {
    it('should load up cluster results', function (done) {
      this.timeout(15000);
      var nightmare = Nightmare({show:true});

      nightmare
        .viewport(1400, 1000)
        .goto(enviro + metroSearch)
        .wait('.city-cluster-small')
        .click('.city-cluster-small')
        //.screenshot(picDir + 'mapPic2.jpg')
        .evaluate(function () {
          var clusters = document.querySelectorAll('.city-cluster-small'),
            rmdCluster = clusters[Math.floor(Math.random()*clusters.length)];

          clusters.forEach(function(cluster, i){
            if(i === rmdCluster) {
              console.log("Found cluster ", cluster, rmdCluster);
              cluster.click()
            }
          });
        })
        .wait('#resultsDiv')
        .evaluate(function () {
          var results = document.querySelector('#resultsDiv');
            return results.childElementCount;
        })
        .end()
        .then(function (results) { //Notice that this is plural! else it would pic up the prev define result.
          //console.log(results);
          expect(results).to.be.at.least(1);
          done();
        })
        .catch(function (error) {
          console.error('Error: Was not able to click cluster', error);
        });
    });

    it('should show the pop-up for a result with a picture', function (done) {
      this.timeout(15000);
      var nightmare = Nightmare({show:true});

      nightmare
        .viewport(1400, 1000)
        .goto(enviro + metroSearch)
        .wait('#rowDiv0')
        .click('#rowDiv0')
        .visible("#bubble")
        //.screenshot(picDir + 'mapPic3.jpg')
        .evaluate(function () {
          return !!document.querySelectorAll('#bubble .tdCenter > div > #pvNextBtn');
        })
        .end()
        .then(function (bubbleWithImg) { //Notice that this is plural! else it would pic up the prev define result.
          expect(bubbleWithImg).to.be.true;
          done();
        })
        .catch(function (error) {
          console.error('Error: Was not able to click cluster', error);
        });
    });
  });
});