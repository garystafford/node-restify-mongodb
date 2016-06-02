var path = require('path');

var info_config = require(path.join(__dirname, '../../config/info'));

var PATH = '/utils';
var VERSION = '1.0.0';

module.exports = function (server) {
  server.get({path: PATH + '/ping', version: VERSION}, ping);
  server.get({path: PATH + '/info', version: VERSION}, info);

  function ping(req, res, next) {
    res.send(200, true);
    return next();
  }

  function info(req, res, next) {
    var info = {
      name: info_config.name,
      version: info_config.version,
      description: info_config.description,
      author: info_config.author
    };
    res.send(200, info);
    return next();
  }
};
