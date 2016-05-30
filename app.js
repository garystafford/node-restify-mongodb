/*jslint node: true, indent: 2 */
'use strict';
var restify = require('restify');
var bunyan = require('bunyan');
var glob = require('glob');
var path = require('path');
var mongoose = require('mongoose');

var config = require(path.join(__dirname, '/config/config'));
var models = require(path.join(__dirname, '/app/models/'));
var routes = require(path.join(__dirname, '/app/routes/'));

var db_url = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(db_url);
console.log(db_url);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + db_url);
});

// var JSONFormatter = require('./app/common/JSONFormatter');

var log = bunyan.createLogger({
  name: config.log.name,
  level: config.log.level,
  stream: process.stdout,
  serializers: bunyan.stdSerializers
});

var server = restify.createServer({
  name: config.app.name,
  log: log,
  formatters: {
// 		'application/json': JSONFormatter
    'application/json': function (req, res, body, cb) {
      res.setHeader('Cache-Control', 'must-revalidate');

      // Does the client *explicitly* accepts application/json?
      var sendPlainText = (req.header('Accept').split(/, */).indexOf('application/json') === -1);

      // Send as plain text
      if (sendPlainText) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }

      // Send as JSON
      if (!sendPlainText) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      return cb(null, JSON.stringify(body));
    }
  }
});

// var models = glob.sync(__dirname + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

// var routes = glob.sync(__dirname + '/app/routes/*.js');
// routes.forEach(function (route) {
//   require(route);
// });

server.use(restify.bodyParser({mapParams: false}));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());

// CORS
server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

/*jslint unparam:true*/
// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, route, err) {
  console.log('******* Begin Error *******');
  console.log(route);
  console.log('*******');
  console.log(err.stack);
  console.log('******* End Error *******');
  if (!res.headersSent) {
    return res.send(500, {ok: false});
  }
  res.write("\n");
  res.end();
});

server.on('after', restify.auditLogger({log: log}));
models();
routes(server);

server.get('/', function (req, res, next) {
  res.send(config.app.name);
  return next();
});

// var Widget = require(__dirname + '/app/models/widget')
//
// server.get('/foo', function (req, res, next) {
//   Widget.find(function (err, widgets) {
//     if (err) return console.error(err);
//     res.json(widgets);
//     return next();
//   });
// });

console.log('Server started.');
server.listen(config.app.port, function () {
  console.log('%s listening at %s', config.app.name, config.app.address);
});
