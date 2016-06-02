module.exports = function (server) {
    var PATH = '/utils';
    var VERSION = '0.0.1';

    server.get({path: PATH + '/ping', version: VERSION}, ping);

    function ping(req, res, next) {
        res.status(200);
        res.send('true');
        return next();
    }
};
