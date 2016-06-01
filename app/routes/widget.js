var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

module.exports = function (server) {
  // https://blog.openshift.com/day-27-restify-build-correct-rest-web-services-in-nodejs/
  var PATH = '/widgets';
  server.get({path: PATH, version: '0.0.1'}, findAllWidgets);
  server.get({path: PATH + '/:product_id', version: '0.0.1'}, findWidget);
  server.post({path: PATH, version: '0.0.1'}, newWidget);
  server.put({path: PATH, version: '0.0.1'}, updateWidget);
  server.del({path: PATH + '/:product_id', version: '0.0.1'}, deleteWidget);

  function findAllWidgets(req, res, next) {
    var conditions = {};
    var projection = {};
    var options = {};

    Widget.find(conditions, projection, options, function (err, widgets) {
      if (!err) {
        res.status(200);
        res.header('X-Total-Count', widgets.length);
        res.send(widgets);
        return next();
      } else {
        return next(err);
      }
    }).limit(20).sort({'name': 1});
  }

  function findWidget(req, res, next) {
    var conditions = {'product_id': req.params.product_id};
    var projection = {};
    var options = {};

    Widget.findOne(conditions, projection, options, function (err, widget) {
      if (!err) {
        res.send(200, widget);
        return next();
      } else {
        return next(err);
      }
    })
  }

  function newWidget(req, res, next) {
    var widget = new Widget;
    widget.product_id = req.params.product_id;
    widget.name = req.params.name;
    widget.color = req.params.color;
    widget.size = req.params.size;
    widget.price = req.params.price;
    widget.inventory = req.params.inventory;

    var options = {};

    widget.save(options, function (err, success) {
      if (success) {
        res.send(201, widget);
        return next();
      } else {
        return next(err);
      }
    })
  }

  function updateWidget(req, res, next) {
    var conditions = {'product_id': req.params.product_id};
    var update = {
      'name': req.params.name,
      'color': req.params.color,
      'size': req.params.size,
      'price': req.params.price,
      'inventory': req.params.inventory
    };
    var options = {upsert: true, runValidators: true, context: 'query'};

    Widget.findOneAndUpdate(conditions, update, options, function (err, widget) {
      if (!err) {
        res.send(201, widget);
        return next();
      } else {
        return next(err);
      }
    });
  }

  function deleteWidget(req, res, next) {
    var options = {'product_id': req.params.product_id};
    
    Widget.remove(options, function (err) {
      if (!err) {
        res.send(204);
        return next();
      } else {
        return next(err);
      }
    })
  }
};
