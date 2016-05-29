var config = require('./config/config');

module.exports = function (grunt) {
  grunt.initConfig({
    "mongoimport": {
      options: {
        "db": "node-restify-mongodb-development",
        "host": "localhost",
        "username": "",
        "password": "",
        "collections": [{
          "name": "items",
          "file": "data/widgets.json",
          "jsonArray": true,
          "drop": true
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-mongoimport");


  grunt.registerTask("default", ["mongoimport"]);
};
