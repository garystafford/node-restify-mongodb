var config = require('./app/config');

module.exports = function(grunt) {
	grunt.initConfig({
		"mongoimport": {
			options: {
				"db": config.db.name,
				"host": "localhost",
				"username": "",
				"password": "",
				"collections": [{
					"name": "items",
					"file": "data/items.json",
					"jsonArray": true,
					"drop": true
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-mongoimport");


	grunt.registerTask("default", ["mongoimport"]);
}
