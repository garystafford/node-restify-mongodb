var request = require('request');

var base_url = 'http://localhost:3000';

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
