'use strict';

var server,
    http = require('http'),
    express = require('express'),
    routes = require('./app/routes/routes');

GLOBAL.app = express();
server = http.Server(app);

routes.getRoutes();

server.listen(3000);
console.log('Started Server on port ' + 3000);