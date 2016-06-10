var request = require('request');
var mongoose = require('mongoose');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

var dbConnection = require(path.join(__dirname, '../db-connection'));
dbConnection();


var foo = require(path.join(__dirname, '../app/models/widget'));
foo();

var Widget = mongoose.model('Widget');

describe('Widget  Endpoints', function () {
  describe('GET /widgets', function () {
    it('returns status code of 200', function (done) {
      request.get(base_url + '/widgets', function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});

// http://rob.conery.io/2012/02/25/testing-your-model-with-mocha-mongo-and-nodejs/
describe('Widget CRUD Endpoints', function () {
  beforeEach(function (done) {
    var options = {};

    Widget.remove(options, function (err) {
      if (err) {
        return err;
      } else {
        console.log('beforeEach: remove');
        done();
      }
    });

    var widget = new Widget();
    widget.product_id = 'F219QZDKLB';
    widget.name = 'Testwidget';
    widget.color = 'White';
    widget.size = 'Medium';
    widget.price = '$99.99';
    widget.inventory = 27;

    widget.save(function (err) {
      if (err) {
        return err;
      } else {
        console.log('beforeEach: save');
        done();
      }
    });
  });

  afterEach(function (done) {
    var options = {'product_id': 'F219QZDKLB'};

    Widget.remove(options, function (err) {
      if (err) {
        return err;
      } else {
        console.log('afterEach: remove');
        done();
      }
    });
  });

  it('returns done', function (done) {
    var conditions = {'product_id': 'F219QZDKLB'};
    var projection = {};
    var options = {};

    Widget.findOne(conditions, projection, options, function (err, widget) {
      if (err) {
        return err;
      } else {
        console.log('findOne');
        expect(widget.name).toBe('Testwidget');
        done();
      }
    });
  });
});


