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

describe('Widget  Endpoints', function () {
});

// http://rob.conery.io/2012/02/25/testing-your-model-with-mocha-mongo-and-nodejs/
function saveWidget(widget, done) {
  widget.save(function (err) {
    if (err) {
      return err;
    } else {
      done();
    }
  });
}

function removeWidgets(options, done) {
  Widget.remove(options, function (err) {
    if (err) {
      return err;
    } else {
      done();
    }
  });
}

describe('Widget CRUD Endpoints', function () {
  beforeEach(function (done) {
    removeWidgets({}, done);

    var widget = new Widget();
    widget.product_id = 'F219QZDKLB';
    widget.name = 'TestWidget1';
    widget.color = 'White';
    widget.size = 'Medium';
    widget.price = '$99.99';
    widget.inventory = 27;
    saveWidget(widget, done)

    widget.product_id = 'JF23H4J0C2';
    widget.name = 'TestWidget2';
    widget.color = 'Ref';
    widget.size = 'Huge';
    widget.price = '$127.95';
    widget.inventory = 104;
    saveWidget(widget, done)
  });

  afterEach(function (done) {
    removeWidgets({}, done);
  });

  describe('Call GET /widgets', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/widgets', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('Call GET /widgets/:product_id', function () {
    it('returns expected \'name\' value', function (done) {
      var conditions = {'product_id': 'F219QZDKLB'};
      var projection = {};
      var options = {};

      Widget.findOne(conditions, projection, options, function (err, widget) {
        if (err) {
          return err;
        } else {
          expect(widget.name).toBe('Testwidget1');
          done();
        }
      });
    });
  });
});


