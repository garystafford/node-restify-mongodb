var MongoUtil = require('./../MongoUtil');
var ModelTypes = require('./../ModelTypes');

MongoUtil.init();

module.exports = function (server) {
  server.get('/items', function (req, res, next) {
    MongoUtil.modelQuery(ModelTypes.ITEM, {}, "", function (docs) {
      res.json(docs);
      return next();
    });
  });
};

