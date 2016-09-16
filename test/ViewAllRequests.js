var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Test Zap V3 login and view all Requests', function() {
  it('Number for all requests in tab should match with list of all requests', function(done) {
    this.timeout(15000);
    var nightmare = Nightmare({show:true});

    nightmare
      .viewport(1200, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://stgv3.myzap.com')
      .type('input#username', 'ben.burnside@era.com')
      .type('input#password', 'Realogy1$')
      .click('input.btn.btn--positive.full-width')
      .wait('a[class="btn btn--next full-width show-all"]')
      .click('a[class="btn btn--next full-width show-all"]')
      .click('span#request-counts')
      .wait(2000)
      
      //.screenshot("/Users/ylayeuski/Desktop/ViewAllTasks.png")
      .evaluate(function () {
          var list = document.getElementById("request-counts").textContent;
          
          var a = document.querySelectorAll("#requests-content > ul > li").length;     
          
          var results = {
            list: parseInt(list),
            totalRequests: a
          }

          return results;
      })
      .end()
      .then(function (results) {
        expect(results.list).to.equal(results.totalRequests);
        done();
      })
      .catch(function (error) {
        console.error('It is not all Requests' , error);
      });   
    });
});