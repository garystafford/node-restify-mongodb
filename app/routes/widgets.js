var MongoUtil = require('../MongoUtil');
var ModelTypes = require('../ModelTypes');

MongoUtil.init();

module.exports = function (server) {
  server.get('/widgets', function (req, res, next) {
    // res.send('hello');
    MongoUtil.modelQuery(ModelTypes.WIDGET, {}, "", function (docs) {
      res.json(docs);
      return next();
    });
  });
};

