'use strict';

var server,
    http = require('http'),
    express = require('express'),
    config = require('./app/config/settings'),
    routes = require('./app/routes/routes');

GLOBAL.app = express();
server = http.Server(app);

require('./app/config/express')();
routes.getRoutes();

server.listen(config.port);
console.log('Started Server on port ' + config.port);