var path = require('path');

var rootPath = path.normalize(__dirname + '/..');

var env = process.env.NODE_ENV || 'development';
var level = process.env.LOG_LEVEL || 'info';
var port = process.env.PORT || 3000;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node-restify-mongodb-development',
      address: '127.0.0.1',
      port: port
    },
    db: {
      host: '127.0.0.1',
      port: '27017',
      name: 'node-restify-mongodb-development'
    },
    log: {
      name: 'node-restify-mongodb-development',
      level: level
    }
  },
  test: {
    root: rootPath,
    app: {
      name: 'node-restify-mongodb-test',
      address: '127.0.0.1',
      port: port
    },
    db: {
      host: '127.0.0.1',
      port: '27017',
      name: 'node-restify-mongodb-test'
    },
    log: {
      name: 'node-restify-mongodb-development',
      level: level
    }
  },
  production: {
    root: rootPath,
    app: {
      name: 'node-restify-mongodb-production',
      address: '127.0.0.1',
      port: port
    },
    db: {
      host: '127.0.0.1',
      port: '27017',
      name: 'node-restify-mongodb-production'
    },
    log: {
      name: 'node-restify-mongodb-development',
      level: level
    }
  }
};

module.exports = config[env];
