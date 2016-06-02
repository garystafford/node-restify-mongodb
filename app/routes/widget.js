var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

module.exports = function (server) {
    var PATH = '/widgets';
    var VERSION = '0.0.1';

    server.get({path: PATH, version: VERSION}, findAllDocuments);
    server.get({path: PATH + '/:product_id', version: VERSION}, findDocument);
    server.post({path: PATH, version: VERSION}, newDocument);
    server.put({path: PATH, version: VERSION}, updateDocument);
    server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);

    function findAllDocuments(req, res, next) {
        var conditions = {};
        var projection = {};
        var options = {};

        Widget.find(conditions, projection, options, function (err, docs) {
            if (!err) {
                res.status(200);
                res.header('X-Total-Count', docs.length);
                res.send(docs);
                return next();
            } else {
                return next(err);
            }
        }).limit(20).sort({'name': 1});
    }

    function findDocument(req, res, next) {
        var conditions = {'product_id': req.params.product_id};
        var projection = {};
        var options = {};

        Widget.findOne(conditions, projection, options, function (err, doc) {
            if (!err) {
                res.send(200, doc);
                return next();
            } else {
                return next(err);
            }
        });
    }

    function newDocument(req, res, next) {
        var doc = new Widget();
        doc.product_id = req.params.product_id;
        doc.name = req.params.name;
        doc.color = req.params.color;
        doc.size = req.params.size;
        doc.price = req.params.price;
        doc.inventory = req.params.inventory;

        var options = {};

        doc.save(options, function (err, success) {
            if (success) {
                res.send(201, doc);
                return next();
            } else {
                return next(err);
            }
        });
    }

    function updateDocument(req, res, next) {
        var conditions = {'product_id': req.params.product_id};
        var update = {
            'name': req.params.name,
            'color': req.params.color,
            'size': req.params.size,
            'price': req.params.price,
            'inventory': req.params.inventory
        };
        var options = {upsert: true, runValidators: true, context: 'query'};

        Widget.findOneAndUpdate(conditions, update, options, function (err, doc) {
            if (!err) {
                res.send(201, doc);
                return next();
            } else {
                return next(err);
            }
        });
    }

    function deleteDocument(req, res, next) {
        var options = {'product_id': req.params.product_id};

        Widget.remove(options, function (err) {
            if (!err) {
                res.send(204);
                return next();
            } else {
                return next(err);
            }
        });
    }
};
