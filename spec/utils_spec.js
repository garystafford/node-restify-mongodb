var request = require('request');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

describe('Widget Application Utilities', function () {
  describe('GET /utils/ping', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns true in response body', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(body).toBe('true');
        done();
      });
    });
  });
  describe('GET /utils/info', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/info', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns info object in response body that matches regular expression', function (done) {
      request.get(base_url + '/utils/info', function (error, response, body) {
        // example: {"name":"foo","version":"1.0.0"..."}
        expect(body).toMatch("(\{\"name\"\:\")(.*)(\"\,\"version\"\:\")(.*)(\"\})");
        done();
      });
    });
  });
});
