var path = require('path');

var rootPath = path.normalize(__dirname + '/..');

var ENV = process.env.NODE_ENV || 'development';
var LEVEL = process.env.LOG_LEVEL || 'info';
var HOST = process.env.NODE_HOST || '127.0.0.1';
var PORT = process.env.NODE_PORT || 3000;
var MONGO_PORT = process.env.MONGO_PORT || 27017;

var appName = 'node-restify-mongodb-';

var config = {
  development: {
    root: rootPath,
    app: {
      name: appName + ENV.toLowerCase(),
      address: HOST,
      port: PORT
    },
    db: {
      host: HOST,
      port: MONGO_PORT,
      name: appName + ENV.toLowerCase()
    },
    log: {
      name: appName + ENV.toLowerCase(),
      level: LEVEL
    }
  },
  test: {
    root: rootPath,
    app: {
      name: appName + ENV.toLowerCase(),
      address: HOST,
      port: PORT
    },
    db: {
      host: HOST,
      port: MONGO_PORT,
      name: appName + ENV.toLowerCase()
    },
    log: {
      name: appName + ENV.toLowerCase(),
      level: LEVEL
    }
  },
  production: {
    root: rootPath,
    app: {
      name: appName + ENV.toLowerCase(),
      address: HOST,
      port: PORT
    },
    db: {
      host: HOST,
      port: MONGO_PORT,
      name: appName + ENV.toLowerCase()
    },
    log: {
      name: appName + ENV.toLowerCase(),
      level: LEVEL
    }
  }
};

module.exports = config[ENV];
