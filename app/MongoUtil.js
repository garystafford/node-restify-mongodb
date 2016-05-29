var mongoose = require('mongoose');
var config = require('./config');

var ModelRegistry = require('./ModelRegistry');

var db;

exports.init = function() {
	var mongoUrl = _getMongoUrl();

	mongoose.connect(mongoUrl);
	db = mongoose.connection;
}

function _getMongoUrl() {
	var base_url = config.db.base_url;
	var dbName = config.db.name;

	return base_url + dbName;
}

exports.modelCreate = function(modelType, modelData) {
	var modelInstance = ModelRegistry.createModelInstance(modelType, modelData);

	if(modelInstance) {
		modelInstance.save(function(err) {
			if(err) throw err;
		});
	}
}

exports.modelQuery = function(modelType, conditions, fieldsStr, callback) {
	var model = ModelRegistry.getModel(modelType);

	if(fieldsStr !== "") {
		fieldsStr += " -_id";
	}
	else {
		fieldsStr = "-_id";
	}

	if(model) {
		db.once('open', function() {
			model.find(conditions, fieldsStr, function(err, docs) {
				if(err) throw err;
				callback(docs);
			});
		});
	}
}
