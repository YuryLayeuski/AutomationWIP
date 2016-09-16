var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line

describe('Test Zap V3 login and view all Personal tasks', function() {
  it('All personal tasks in tab should match with list of all personal tasks', function(done) {
    this.timeout(15000);
    var nightmare = Nightmare({show:true});

    nightmare
      .viewport(1200, 1000)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      .goto('http://qav3.myzap.com')
      .type('input#username', 'ben.burnside@era.com')
      .type('input#password', 'Realogy1$')
      .click('input.btn.btn--positive.full-width')
      .wait('a[class="btn btn--next full-width show-all"]')
      .click('a[class="btn btn--next full-width show-all"]')
      .wait(2000)
      .click('span#personal-counts')
      .wait(2000)
      
      //.screenshot("/Users/ylayeuski/Desktop/ViewAllTasks.png")
      .evaluate(function () {
          
          var list = document.getElementById("personal-counts").textContent;       
          var a = document.querySelectorAll("#personal-content > ul > li").length;     
          
          var results = {
            list: parseInt(list),
            totalTasks: a
          }

          return results;
      })
      .end()

      .then(function (results) {
        expect(results.list).to.equal(results.totalTasks);
        done();
      })
      .catch(function (error) {
        console.error('It is not all Personal tasks' , error);
      });   
    });
});




