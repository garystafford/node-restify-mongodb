var ModelTypes = require('./ModelTypes');
var Widget = require('./models/Widget');

exports.createModelInstance = function (modelType, data) {
  switch (modelType) {
    case ModelTypes.WIDGET:
      return new Widget(data);
      break;
    default:
  }
};

exports.getModel = function (modelType) {
  switch (modelType) {
    case ModelTypes.WIDGET:
      return Widget;
      break;
    default:
  }
};
