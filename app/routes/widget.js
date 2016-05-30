var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

module.exports = function (server) {
  server.get('/widgets', function (req, res, next) {
    Widget.find(function (err, widgets) {
      if (err) return console.error(err);
      res.json(widgets);
      return next();
    });
  });
};
