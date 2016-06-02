var request = require('request');

var base_url = 'http://localhost:3000';

describe('Widget Application', function () {
  describe('GET /utils/ping', function () {
    it('returns status code 200', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns \"true\"', function (done) {
      request.get(base_url + '/utils/ping', function (error, response, body) {
        expect(body).toBe('"true"');
        done();
      });
    });
  });
});
