## Node-Restify-MongoDB Generated RESTful API

## Introduction
This project was built using the [generator-node-restify-mongodb](https://www.npmjs.com/package/generator-node-restify-mongodb)
 [Yeoman generator](http://yeoman.io/generators/). The generator scaffolds a basic RESTful CRUD API, based on [Node](https://nodejs.org), [Restify](http://restify.com),
 and [MongoDB](https://www.mongodb.com). Restify, used most notably by [Netflix](http://techblog.netflix.com/2014/11/nodejs-in-flames.html),
 borrows heavily from [Express](http://expressjs.com), according to the Restify website. However, while Express is targeted at browser
 applications, with templating and rendering, Restify is keenly focused on building API services that are maintainable and observable.         

Portions of this project's file structure and code are derived from what I consider the best parts of several different
 projects, including [generator-express](https://github.com/expressjs/generator),
 [generator-restify-mongo](https://github.com/lawrence-yu/generator-restify-mongo), and
 [generator-restify](https://github.com/chris-l/generator-restify).

Along with Node, Restify, and MongoDB, the project also implements the following packages: [Bunyan](https://github.com/trentm/node-bunyan)
 (includes [DTrace](http://dtrace.org/blogs/about/) support), [Jasmine](https://github.com/mhevery/jasmine-node)
 (using [jasmine-node](https://github.com/mhevery/jasmine-node)),
 [Mongoose](http://mongoosejs.com/index.html), and [Grunt](http://gruntjs.com).

## Installation
First, install [Yeoman](http://yeoman.io) and generator-node-restify-mongodb using [npm](https://www.npmjs.com/)
 (we assume you have pre-installed [node.js](https://nodejs.org/)).
``` bash
npm install -g yo
npm install -g generator-node-restify-mongodb
```

Then generate your new project
``` bash
yo node-restify-mongodb
```

## Using the Generated Application
Import sample widget documents into MongoDB from the supplied 'data/widgets.json' file
``` bash
# import to local development environment
grunt mongoimport --verbose
  
# import to production environment db instance
NODE_ENV=production grunt mongoimport --verbose
```

Start the application
``` bash
npm run
```

To test the application using jshint and jasmine-node, the sample documents must be imported into MongoDB (see above), and the application must be running (see above)
``` bash
npm test
```

Similarly, to review code coverage, using grunt, mocha, istanbul, and grunt-mocha-istanbul
``` bash
grunt coverage
```



Test the running application by cURLing the '/widgets' endpoint
``` bash
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets"
```
For a better output, try
``` bash
npm install -g json
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets" --silent | json
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets/SVHXPAWEOD" --silent | json
```

#### API Endpoints
The current API endpoints, include the following
``` javascript
# widget resources
var PATH = '/widgets';
server.get({path: PATH, version: VERSION}, findDocuments);
server.get({path: PATH + '/:product_id', version: VERSION}, findOneDocument);
server.post({path: PATH, version: VERSION}, createDocument);
server.put({path: PATH, version: VERSION}, updateDocument);
server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);
  
# utility resources
var PATH = '/utils';
server.get({path: PATH + '/ping', version: VERSION}, ping);
server.get({path: PATH + '/health', version: VERSION}, health);
server.get({path: PATH + '/info', version: VERSION}, information);
server.get({path: PATH + '/config', version: VERSION}, configuraton);
server.get({path: PATH + '/env', version: VERSION}, environment);
```

#### Widget
The basic 'widget' object is used throughout, to demonstrate Mongoose's
 [Model](http://mongoosejs.com/docs/models.html) and [Schema](http://mongoosejs.com/docs/guide.html)
``` json
{
  "product_id": "4OZNPBMIDR",
  "name": "Fapster",
  "color": "Orange",
  "size": "Medium",
  "price": "29.99",
  "inventory": 5
}
```

#### MongoDB
To access the application's MongoDB database with sample documents
```
mongo
 > show dbs
 > use node-restify-mongodb-development
 > show tables
 > db.widgets.find()
  { "_id" : ObjectId("574cf9bb0f515d7c67a87026"), "product_id" : "4OZNPBMIDR", "name" : "Fapster", "color" : "Orange", "size" : "Medium", "price" : "29.99", "inventory" : 5 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87027"), "product_id" : "SVHXPAWEOD", "name" : "Voonex", "color" : "Green", "size" : "Medium", "price" : "$10.99", "inventory" : 50 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87028"), "product_id" : "3YIRGZ6TDW", "name" : "Groopster", "color" : "Yellow", "size" : "Large", "price" : "$99.95", "inventory" : 100 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87029"), "product_id" : "6T2HC5MIZ9", "name" : "Chaintwist", "color" : "Purple", "size" : "Tiny", "price" : "$99.95", "inventory" : 15 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702a"), "product_id" : "ERZ1RMJFR3", "name" : "Glozzom", "color" : "Red", "size" : "Huge", "price" : "$199.98", "inventory" : 35 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702b"), "product_id" : "N43WV5234S", "name" : "Zapster", "color" : "Green", "size" : "Tiny", "price" : "$17.49", "inventory" : 65 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702c"), "product_id" : "0BVCLPDZ42", "name" : "Chaintwist", "color" : "Blue", "size" : "Medium", "price" : "$89.95", "inventory" : 55 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702d"), "product_id" : "N212QZOD9B", "name" : "Pentwist", "color" : "Yellow", "size" : "Huge", "price" : "$159.98", "inventory" : 95 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702e"), "product_id" : "RTHGP1FCGN", "name" : "Reflupper", "color" : "Red", "size" : "Large", "price" : "$12.95", "inventory" : 25 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702f"), "product_id" : "GKO1SFX04M", "name" : "Jukelox", "color" : "Blue", "size" : "Small", "price" : "$25.49", "inventory" : 75 }
```

#### Environmental Variables
The application uses the following environment variables and defaults, which are found in the 'config/config.js' file.
``` javascript
var NODE_ENV   = process.env.NODE_ENV   || 'development';
var NODE_HOST  = process.env.NODE_HOST  || '127.0.0.1';
var NODE_PORT  = process.env.NODE_PORT  || 3000;
var MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
var MONGO_PORT = process.env.MONGO_PORT || 27017;
var LOG_LEVEL  = process.env.LOG_LEVEL  || 'info';
var APP_NAME   = 'node-restify-mongodb-';
```

## TODO
* ~~Add jasmine-node tests for new Utility endpoints~~
* ~~Add jasmine-node tests for Widget endpoints~~
* Convert from out-dated jasmine-node to jasmine?
* Add ability to read query params
* Add filtering, sorting, field selection and paging
* Add HATEOAS features
* Add authentication and authorization to production MongoDB instance


## References
http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api  
https://blog.openshift.com/day-27-restify-build-correct-rest-web-services-in-nodejs  
https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications  
http://stackoverflow.com/questions/15123182/mongoose-findoneandupdate-not-working  
http://support.mashery.com/docs/read/mashery_api/30/Pagination  
https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-jasmine  
https://github.com/mhevery/jasmine-node/blob/master/package.json  
http://stackoverflow.com/a/20730416/580268  
http://tools.ietf.org/html/rfc7231#section-4.3  
