var restify = require('restify');

var Config = require('./app/config');

var routes = require('./app/routes');

var JSONFormatter = require('./config/JSONFormatter');

var server = restify.createServer({
	name: Config.server.name,
	version: Config.server.version,
	formatters: {
		'application/json': JSONFormatter
	}
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// CORS
server.use(
	function crossOrigin(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);

routes.setup(server);

server.listen(Config.server.port, function() {
	console.log('%s listening at %s', server.name, server.url);
});
