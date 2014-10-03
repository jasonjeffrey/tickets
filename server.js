'use strict';

var http = require('http'),
  express = require('express'),
  config = require('./server/config/settings'),
  Poll = require('burrows-pollUtils'),
  mongooseConfig = require('./server/config/mongoose'),
  expressConfig = require('./server/config/express'),
  routesConfig = require('./server/config/routes'),
  feedController = require('./server/controllers/feed'),
  constants = require('./server/config/constants'),

  feedPoller = new Poll(),
  app = express(),
  server = http.Server(app);

mongooseConfig(config);
expressConfig(app, config);
routesConfig(app, config);

feedPoller.start(function () {
  feedController.updateFeedsInDB();
}, constants.TIMER.MINUTES_15);

server.listen(config.port);
console.log('Started Server on port ' + config.port);
