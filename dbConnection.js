var mongoose = require('mongoose');
var path = require('path');

var config = require(path.join(__dirname, '/config/config'));

module.exports = function () {
  var db_url = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
  mongoose.connect(db_url);
  //console.log(db_url);
  var db = mongoose.connection;

  db.on('connected', function () {
    console.log('Mongodb connection open to ' + db_url);
  });
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + db_url);
  });
  db.on('disconnected', function () {
    console.log('Mongodb connection disconnected');
  });
  process.on('SIGINT', function () {
    db.close(function () {
      console.log('Mongodb connection disconnected through app termination');
      process.exit(0);
    });
  });
};
