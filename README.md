## Node Restify MongoDB API Example

_DRAFT - Work in Progress..._  

#### Introduction
A basic, RESTful, CRUD API, based on Node, Restify, and MongoDB.
Designed and built using the best part of the following three Yeoman generator projects:  
[generator-restify-mongo](https://github.com/lawrence-yu/generator-restify-mongo)  
[generator-restify](https://github.com/chris-l/generator-restify)  
[generator-express](https://github.com/expressjs/generator)  

#### Other Resources 
http://restify.com  
https://blog.openshift.com/day-27-restify-build-correct-rest-web-services-in-nodejs  
https://thejavanode.wordpress.com/2014/11/17/building-a-simple-rest-api-using-node-js-restify-js-and-mongodb-mongoose-js-part-3-defining-a-schema-and-using-a-modele/

#### Widgets
A project uses a 'widget' as the mongoosejs model/schema example object. The example below shows a widget's document structure.
```json
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

#### Other Commands
```
# populate MongoDB with (10) Widgets
grunt
```
```
npm test
npm run
```

```
mongo
MongoDB shell version: 3.0.7
connecting to: test
> use node-restify-mongodb-development
switched to db node-restify-mongodb-development
> show tables
system.indexes
widgets
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
{ "_id" : ObjectId("574cf9bb0f515d7c67a8702f"), "product_id" : "GKO1SFX04M", "name" : "Jukelox", "color" : "Blue", "size" : "Small", "price" : "$25.49", "inventory" : 75 }```
