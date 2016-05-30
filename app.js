/*jslint node: true, indent: 2 */
'use strict';
var restify = require('restify');
var bunyan = require('bunyan');

var routes = require('./app/routes/');
var config = require('./config/config');
var JSONFormatter = require('./app/common/JSONFormatter');

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

server.use(restify.bodyParser({mapParams: false}));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());

// // CORS
// server.use(
//     function crossOrigin(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "X-Requested-With");
//         return next();
//     }
// );

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
/*jslint unparam:false*/

server.on('after', restify.auditLogger({log: log}));
routes(server);

console.log('Server started.');
server.listen(config.app.port, function () {
    console.log('%s listening at %s', config.app.name, config.app.address);
});
