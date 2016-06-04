## Node Restify MongoDB API Example

#### Introduction
A basic, RESTful CRUD API, based on Node, Restify, and MongoDB.
Designed and built using, what I consider, the best part of the following three Yeoman generators:  
* [generator-restify-mongo](https://github.com/lawrence-yu/generator-restify-mongo)  
* [generator-restify](https://github.com/chris-l/generator-restify)  
* [generator-express](https://github.com/expressjs/generator)  

#### API Endpoints
``` javascript
var PATH = '/widgets';
var VERSION = '1.0.0';
  
# basic CRUD operations
server.get({path: PATH, version: VERSION}, findDocuments);
server.get({path: PATH + '/:product_id', version: VERSION}, findOneDocument);
server.post({path: PATH, version: VERSION}, createDocument);
server.put({path: PATH, version: VERSION}, updateDocument);
server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);
```

#### Widget
The 'widget' object is used to demonstrate mongoose.js model and schema. The widget's structure looks like:
``` bson
{
  "_id": ObjectId("574cf9bb0f515d7c67a87026"),
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
```

Populate MongoDB with sample widgets
``` bash
grunt mongoimport
  Running "mongoimport" task
  2016-06-04T01:09:28.483-0400	connected to: 127.0.0.1
  2016-06-04T01:09:28.484-0400	dropping: node-restify-mongodb-development.widgets
  2016-06-04T01:09:28.553-0400	imported 10 documents
  Done.
  Process finished with exit code 0
```

Start the application
``` bash
npm run
```

Test application with jshint and jasmine-node  
Note, application must be running for Jasmine tests
``` bash
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
``` mongo
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
