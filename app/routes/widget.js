var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

module.exports = function (server) {
  server.get('/widgets/count', function (req, res, next) {
    Widget.count(function (err, count) {
      if (err) return console.error(err);
      res.send(count.toString());
    });
    return next();
  });

  server.get('/widgets', function (req, res, next) {
    Widget.find(function (err, widgets) {
      if (err) return console.error(err);
      res.json(widgets);
    });
    return next();
  });
};
