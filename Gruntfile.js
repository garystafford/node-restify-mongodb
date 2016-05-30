var config = require('./config/config');

module.exports = function (grunt) {
  grunt.initConfig({
    "mongoimport": {
      options: {
        "db": config.db.name,
        "host": config.db.host,
        "username": "",
        "password": "",
        "collections": [{
          "name": "widgets",
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
