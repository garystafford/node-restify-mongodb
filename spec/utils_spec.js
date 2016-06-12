var request = require('request');
var should = require('should');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

describe('Utility URIs', function () {
  describe('GET /utils/ping', function () {
    var url = base_url + '/utils/ping';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'text/plain'
      }
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns \'true\'', function (done) {
      request(options, function (error, response, body) {
        expect(body).toBe('true');
        done();
      });
    });
  });

  describe('GET /utils/health', function () {
    var url = base_url + '/utils/health';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns a \'status\' of \'UP\'', function (done) {
      request(options, function (error, response, body) {
        var status = JSON.parse(body);
        status.should.have.a.property('status', 'UP');
        done();
      });
    });
  });

  describe('GET /utils/info', function () {
    var url = base_url + '/utils/info';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns exactly (1) object with (4) properties', function (done) {
      request(options, function (error, response, body) {
        var info = JSON.parse(body);
        Object.keys(info).should.have.a.lengthOf(4);
        done();
      });
    });
  });

  describe('GET /utils/config', function () {
    var url = base_url + '/utils/config';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns exactly (1) non-null object', function (done) {
      request(options, function (error, response, body) {
        var config = JSON.parse(body);
        config.should.be.an.instanceof(Object).and.not.be.null;
        done();
      });
    });
  });

  describe('GET /utils/env', function () {
    var url = base_url + '/utils/env';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns exactly (1) non-null object', function (done) {
      request(options, function (error, response, body) {
        var env = JSON.parse(body);
        env.should.be.an.instanceof(Object).and.not.be.null;
        done();
      });
    });
  });
});
