var request = require('request');
var mongoose = require('mongoose');
var should = require('should');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

var dbConnection = require(path.join(__dirname, '../db-connection'));
dbConnection();

var widget_model = require(path.join(__dirname, '../app/models/widget'));
widget_model();
var Widget = mongoose.model('Widget');

var log = require(path.join(__dirname, '../log'));

//////////// Helper Functions ////////////

function saveWidget(widget, done) {
  widget.save(function (error) {
    if (error) {
      log.error(error);
    } else {
      done();
    }
  });
}

function removeWidgets(options, done) {
  Widget.remove(options, function (error) {
    if (error) {
      log.error(error);
    } else {
      done();
    }
  });
}

//////////// Tests ///////////////////////

describe('Widget Endpoints', function () {
  describe('GET /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: 'YMIYW2VROS',
        name: 'TestWidget_YMIYW2VROS',
        color: 'Black',
        size: 'Huge',
        price: '$99.99',
        inventory: 96
      }), done);

      saveWidget(new Widget({
        product_id: 'FGBRYL6XSF',
        name: 'TestWidget_FGBRYL6XSF',
        color: 'Red',
        size: 'Huge',
        price: '$127.49',
        inventory: 1205
      }), done);

      saveWidget(new Widget({
        product_id: '5H7HW8Y1E2',
        name: 'TestWidget_5H7HW8Y1E2',
        color: 'Black',
        size: 'Tiny',
        price: '$1.49',
        inventory: 0
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url = base_url + '/widgets';

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

    it('returns exactly (3) widgets objects in an array', function (done) {
      request(options, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.be.an.instanceof(Array).and.have.a.lengthOf(3);
        done();
      });
    });
  });

  describe('GET /widgets/:product_id', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: '4YFZH127BX',
        name: 'TestWidget_4YFZH127BX',
        color: 'Orange',
        size: 'Small',
        price: '$19.93',
        inventory: 13
      }), done);

      saveWidget(new Widget({
        product_id: '0EJLZK6BK8',
        name: 'TestWidget_0EJLZK6BK8',
        color: 'Red',
        size: 'Huge',
        price: '$137.49',
        inventory: 46
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url = base_url + '/widgets/4YFZH127BX';

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

    it('returns exactly (1) widget object', function (done) {
      request(options, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.be.an.instanceof(Object);
        done();
      });
    });

    it('returns widget with expected value for \'name\' key', function (done) {
      request(options, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.have.a.property('name', 'TestWidget_4YFZH127BX');
        done();
      });
    });
  });

  describe('POST /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);
    });
    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var widget = {
      product_id: 'DC3NHTGNAY',
      name: 'TestWidget_DC3NHTGNAY',
      color: 'Green',
      size: 'Big',
      price: '$79.92',
      inventory: 27
    };

    var url = base_url + '/widgets';

    var options = {
      method: 'POST',
      url: url,
      headers: {
        accept: 'application/json'
      },
      body: widget,
      json: true
    };

    it('returns status code of 201', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(201);
        done();
      });
    });

    it('returns exactly (1) widget object', function (done) {
      request(options, function (error, response, body) {
        body.should.be.an.instanceof(Object);
        done();
      });
    });

    it('returns widget with \'TestWidget_DC3NHTGNAY\' value for \'name\' key', function (done) {
      request(options, function (error, response, body) {
        body.should.have.a.property('name', 'TestWidget_DC3NHTGNAY');
        done();
      });
    });
  });

  describe('PUT /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: 'ZC7DV7BSPE',
        name: 'TestWidget_ZC7DV7BSPE',
        color: 'Blue',
        size: 'Small',
        price: '$9.92',
        inventory: 27
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var widget = { // modified inventory level
      product_id: 'ZC7DV7BSPE',
      name: 'TestWidget_ZC7DV7BSPE',
      color: 'Blue',
      size: 'Small',
      price: '$9.92',
      inventory: 21
    };

    var url = base_url + '/widgets';

    var options = {
      method: 'PUT',
      url: url,
      headers: {
        accept: 'application/json'
      },
      body: widget,
      json: true
    };

    it('returns status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('returns no response body', function (done) {
      request(options, function (error, response, body) {
        response.should.not.have.a.property('body');
        done();
      });
    });
  });
});

