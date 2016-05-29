var mongoose = require('mongoose');
var ModelTypes = require('./ModelTypes');

var Item = require('./models/Item');

exports.createModelInstance = function(modelType, data) {
	switch(modelType) {
		case ModelTypes.ITEM:
			return new Item(data);
			break;
		default:
	}
};

exports.getModel = function(modelType) {
	switch(modelType) {
		case ModelTypes.ITEM:
			return Item;
			break;
		default:
	}
}
