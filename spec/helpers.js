var mongoose = require('mongoose');
var path = require('path');

var dbConnection = require(path.join(__dirname, '../db-connection'));
dbConnection();

var widget_model = require(path.join(__dirname, '../app/models/widget'));
widget_model();

var Widget = mongoose.model('Widget');

module.exports = function () {
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
};
