/*jslint node: true, indent: 2 */
'use strict';
var restify = require('restify');
var bunyan = require('bunyan');
var path = require('path');

var config = require(path.join(__dirname, '/config/config'));
var models = require(path.join(__dirname, '/app/models/'));
var routes = require(path.join(__dirname, '/app/routes/'));
var dbConnection = require(path.join(__dirname, 'dbConnection'));

dbConnection();

var log = bunyan.createLogger({
  name: config.log.name,
  level: config.log.level,
  stream: process.stdout,
  serializers: bunyan.stdSerializers
});

var server = restify.createServer({
  name: config.app.name,
  log: log
});

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());
server.use(
  function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
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
  res.write('\n');
  res.end();
});

server.on('after', restify.auditLogger({log: log}));

models();
routes(server);

server.get('/', function (req, res, next) {
  res.send(config.app.name);
  return next();
});

console.log('Server started.');
server.listen(config.app.port, function () {
  console.log('Application %s listening at %s:%s', config.app.name, config.app.address, config.app.port);
});
