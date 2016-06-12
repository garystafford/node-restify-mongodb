var request = require('request');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

describe('Utility Endpoints', function () {
  describe('GET /utils/ping', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns \'true\' in response body', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(body).toBe('true');
        done();
      });
    });
  });

  describe('GET /utils/health', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/health', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns {"status":"UP"} in response body', function (done) {
      request.get(base_url + '/utils/health', function (error, response, body) {
        expect(body).toBe('{"status":"UP"}');
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

  describe('GET /utils/config', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/config', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns non-null object in response body', function (done) {
      request.get(base_url + '/utils/config', function (error, response, body) {
        expect(body).toMatch("(\{\")(.*)(\"\})");
        done();
      });
    });
  });

  describe('GET /utils/env', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/utils/env', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns non-null object in response body', function (done) {
      request.get(base_url + '/utils/env', function (error, response, body) {
        expect(body).toMatch("(\{\")(.*)(\"\})");
        done();
      });
    });
  });
});
