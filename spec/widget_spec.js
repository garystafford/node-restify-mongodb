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

// http://rob.conery.io/2012/02/25/testing-your-model-with-mocha-mongo-and-nodejs/
function saveWidget(widget, done) {
  widget.save(function (err) {
    if (err) {
      log.error(err);
    } else {
      done();
    }
  });
}

function removeWidgets(options, done) {
  Widget.remove(options, function (err) {
    if (err) {
      log.error(err);
    } else {
      done();
    }
  });
}

describe('Test Widget CRUD Endpoints', function () {
  beforeEach(function (done) {
    removeWidgets({}, done);

    var widget1 = new Widget();
    widget1.product_id = 'F219QZDKLB';
    widget1.name = 'TestWidget1';
    widget1.color = 'White';
    widget1.size = 'Medium';
    widget1.price = '$99.99';
    widget1.inventory = 27;
    saveWidget(widget1, done);

    var widget2 = new Widget();
    widget2.product_id = 'JF23H4J0C2';
    widget2.name = 'TestWidget2';
    widget2.color = 'Red';
    widget2.size = 'Huge';
    widget2.price = '$127.95';
    widget2.inventory = 104;
    saveWidget(widget2, done);
  });

  afterEach(function (done) {
    removeWidgets({}, done);
  });

  it('GET /widgets returns status code of 200', function (done) {
    request.get(base_url + '/widgets', function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /widgets/:product_id returns expected value for \'name\' field', function (done) {
    var conditions = {'product_id': 'F219QZDKLB'};
    var projection = {};
    var options = {};

    Widget.findOne(conditions, projection, options, function (err, doc) {
      if (err) {
        return err;
      } else {
        expect(doc.name).toBe('TestWidget1');
        done();
      }
    });
  });
});


