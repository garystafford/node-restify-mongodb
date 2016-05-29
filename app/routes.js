exports.setup = function(app) {
	var MongoUtil = require('./MongoUtil');

	MongoUtil.init();

	var ModelTypes = require('./ModelTypes');

	app.get('/items', function(req, res, next) {
		MongoUtil.modelQuery(ModelTypes.ITEM, {}, "", function(docs) {
			res.json(docs);
			return next();
		});
	});
}
