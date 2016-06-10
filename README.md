## Node-Restify-MongoDB RESTful API Example

#### Introduction
A basic, RESTful CRUD API example, based on [Node](https://nodejs.org), [Restify](http://restify.com),
 and [MongoDB](https://www.mongodb.com). Restify, used, notably, by [Netflix](http://techblog.netflix.com/2014/11/nodejs-in-flames.html),
 borrows heavily from [Express](http://expressjs.com), according to the Restify website. However, while Express is targeted at browser
 applications, with templating and rendering, Restify is focused on building API services that are maintainable and observable.         

The structure of the project, and a portion of the code is derived from, what I consider, the best parts of three different
 [Yeoman generators](http://yeoman.io/generators/)  
* [generator-restify-mongo](https://github.com/lawrence-yu/generator-restify-mongo)  
* [generator-restify](https://github.com/chris-l/generator-restify)  
* [generator-express](https://github.com/expressjs/generator)  

Along with Node, Restify, and MongoDB, the project also implements [Bunyan](https://github.com/trentm/node-bunyan)
 (include [DTrace](http://dtrace.org/blogs/about/) support), [Jasmine](https://github.com/mhevery/jasmine-node),
 [Mongoose](http://mongoosejs.com/index.html), and [Grunt](http://gruntjs.com).

#### API Endpoints
```javascript
# basic CRUD resources
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
The 'widget' object is used to demonstrate mongoose.js model and schema. The widget's structure looks like:
```json
{
  "product_id": "4OZNPBMIDR",
  "name": "Fapster",
  "color": "Orange",
  "size": "Medium",
  "price": "29.99",
  "inventory": 5
}
```

#### Commands
Download and Install the project from GitHub
```bash
git clone https://github.com/garystafford/node-restify-mongodb.git
cd node-restify-mongodb
npm install
jasmine init
```

Populate MongoDB with sample widgets
```bash
grunt mongoimport
  Running "mongoimport" task
  2016-06-04T01:09:28.483-0400	connected to: 127.0.0.1
  2016-06-04T01:09:28.484-0400	dropping: node-restify-mongodb-development.widgets
  2016-06-04T01:09:28.553-0400	imported 10 documents
  Done.
  Process finished with exit code 0
```

Start the application
```bash
npm run
```

Test application with jshint and jasmine-node  
Note, application must be running for Jasmine tests
```bash
npm test
```

Grunt tasks
```
# grunt task for importing data into mongodb
grunt mongoimport

# alias for "mongoimport", "exec:jshint_test", "exec:jasmine_test" tasks
grunt

# alias for "exec:jshint_test", "exec:jasmine_test" tasks
grunt test 
```

MongoDB
```mongo
mongo
  MongoDB shell version: 3.0.7
  connecting to: test
  
use node-restify-mongodb-development
  switched to db node-restify-mongodb-development
  
show tables
  system.indexes
  widgets
  
db.widgets.find()
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

#### TODO
* ~~Add Jasmine tests for new Utility endpoints~~
* Add Jasmine tests for Widget endpoints
* Add ability to read query params
* Add filtering, sorting, field selection and paging
* Add HATEOAS features


#### References
http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api  
https://blog.openshift.com/day-27-restify-build-correct-rest-web-services-in-nodejs  
https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications  
http://stackoverflow.com/questions/15123182/mongoose-findoneandupdate-not-working  
http://support.mashery.com/docs/read/mashery_api/30/Pagination  
https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-jasmine  
https://github.com/mhevery/jasmine-node/blob/master/package.json  
http://stackoverflow.com/a/20730416/580268  
http://tools.ietf.org/html/rfc7231#section-4.3  

