var request = require('request');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

describe('Widget CRUD Endpoints', function () {
  describe('GET /widgets', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/widgets', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
