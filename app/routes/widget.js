var mongoose = require('mongoose');
var path = require('path');

var config = require(path.join(__dirname, '../../config/config'));
var Widget = mongoose.model('Widget');

module.exports = function (server) {
  var PATH = '/widgets';
  var VERSION = '1.0.0';

  server.get({path: PATH, version: VERSION}, findDocuments);
  server.get({path: PATH + '/:product_id', version: VERSION}, findOneDocument);
  server.post({path: PATH, version: VERSION}, createDocument);
  server.put({path: PATH, version: VERSION}, updateDocument);
  server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);

  function findDocuments(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.find
    var conditions = {};
    var projection = {};
    var options = {};

    Widget.find(conditions, projection, options).sort({'name': 1}).exec(function (err, widgets) {
      if (err) {
        return next(err);
      } else {
        res.header('X-Total-Count', widgets.length);
        res.send(200, widgets);
        return next();
      }
    });
  }

  function findOneDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOne
    var conditions = {'product_id': req.params.product_id};
    var projection = {};
    var options = {};

    Widget.findOne(conditions, projection, options, function (err, widget) {
      if (err) {
        return next(err);
      } else {
        res.send(200, widget);
        return next();
      }
    });
  }

  function createDocument(req, res, next) {
    var widget = new Widget();
    widget.product_id = req.params.product_id;
    widget.name = req.params.name;
    widget.color = req.params.color;
    widget.size = req.params.size;
    widget.price = req.params.price;
    widget.inventory = req.params.inventory;

    // http://mongoosejs.com/docs/api.html#model_Model-save
    widget.save(function (err, widget, numAffected) {
      if (err) {
        return next(err);
      } else {
        res.send(201, widget);
        return next();
      }
    });
  }

  function updateDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    var conditions = {'product_id': req.params.product_id};
    var update = {
      'name': req.params.name,
      'color': req.params.color,
      'size': req.params.size,
      'price': req.params.price,
      'inventory': req.params.inventory
    };
    var options = {runValidators: true, context: 'query'};

    Widget.findOneAndUpdate(conditions, update, options, function (err) {
      if (err) {
        return next(err);
      } else {
        res.send(200);
        return next();
      }
    });
  }

  function deleteDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    var options = {'product_id': req.params.product_id};

    Widget.remove(options, function (err) {
      if (err) {
        return next(err);
      } else {
        res.send(204);
        return next();
      }
    });
  }
};
