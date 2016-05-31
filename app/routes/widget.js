var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

module.exports = function (server) {
//   server.get('/widgets/count', function (req, res, next) {
//     Widget.count(function (err, count) {
//       if (err) return console.error(err);
//       res.send(count.toString());
//     });
//     return next();
//   });

// server.get('/widgets', function (req, res, next) {
//   Widget.find(function (err, widgets) {
//     if (err) return console.error(err);
//     res.json(widgets);
//   });
//   return next();
// });
// };

  // https://blog.openshift.com/day-27-restify-build-correct-rest-web-services-in-nodejs/
  var PATH = '/widgets';
  server.get({path: PATH, version: '0.0.1'}, findAllWidgets);
  server.get({path: PATH + '/:product_id', version: '0.0.1'}, findWidget);
  server.post({path: PATH, version: '0.0.1'}, newWidget);
  server.put({path: PATH, version: '0.0.1'}, updateWidget);
  server.del({path: PATH + '/:product_id', version: '0.0.1'}, deleteWidget);


  function findAllWidgets(req, res, next) {
    Widget.find(function (err, success) {
      if (success) {
        res.send(200, success);
        return next();
      } else {
        return next(err);
      }
    }).limit(20).sort({'name': 1});
  }

  function findWidget(req, res, next) {
    Widget.findOne({'product_id': req.params.product_id}, function (err, success) {
      if (success) {
        res.send(200, success);
        return next();
      }
      return next(err);
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

    widget.save(function (err, success) {
      if (success) {
        res.send(201, widget);
        return next();
      } else {
        return next(err);
      }
    });
  }

  function updateWidget(req, res, next) {
    Widget.findOneAndUpdate({username: 'starlord55'}, {username: 'starlord88'}, function (err, widget) {
      if (!err) {
        res.send(201, widget);
        return next();
      } else {
        return next(err);
      }
    });
  }

  function deleteWidget(req, res, next) {
    Widget.remove({'product_id': req.params.product_id}, function (err, success) {
      if (success) {
        res.send(204);
        return next();
      } else {
        return next(err);
      }
    })
  }
};
