'use strict';

var compress = require('compression'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  viewHandler = require('express3-handlebars'),
  errorHandler = require('errorhandler');

module.exports = function (app, config) {
  app.use(compress())
    .set('port', config.port)
    .set('view engine', 'ejs')
    .set('views', config.root + '/server/views')
    .engine('.html', viewHandler(
      {
        extname: '.html',
        defaultLayout: 'main',
        layoutsDir: 'server/views/layouts',
        partialsDir: 'server/views/partials'
      }
    ))
    .set('view engine', '.html')
    .use(logger(config.loggingLevel))
    .use(bodyParser.json())
    .use(methodOverride());

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorHandler());
  }
};
