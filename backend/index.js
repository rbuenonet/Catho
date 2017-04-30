var restify = require('restify');
var cors = require('cors');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Client
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var clientController = require('./controller/client');

server.get('/client', function(req, res, next){ clientController.list(req, res, next) });
server.get('/client/:id', function(req, res, next){ clientController.consult(req, res, next) });
server.get('/client/:id/rules', function(req, res, next){ clientController.consultRules(req, res, next) });
server.post('/client', function(req, res, next){ clientController.insert(req, res, next) });
server.put('/client', function(req, res, next){ clientController.update(req, res, next) });

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Product
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var productController = require('./controller/product');

server.get('/product', function(req, res, next){ productController.list(req, res, next) });
server.get('/product/:id', function(req, res, next){ productController.consult(req, res, next) });
server.post('/product', function(req, res, next){ productController.insert(req, res, next) });
server.put('/product', function(req, res, next){ productController.update(req, res, next) });

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Rules
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var ruleController = require('./controller/rule');

server.get('/rule', function(req, res, next){ ruleController.list(req, res, next) });
server.get('/rule/:id', function(req, res, next){ ruleController.consult(req, res, next) });
server.post('/rule', function(req, res, next){ ruleController.insert(req, res, next) });
server.put('/rule', function(req, res, next){ ruleController.update(req, res, next) });

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Order
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var orderController = require('./controller/order');

server.post('/order', function(req, res, next){ orderController.add(req, res, next) });