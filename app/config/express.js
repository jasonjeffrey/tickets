'use strict';

var compress = require('compression'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    viewHandler = require('express-handlebars'),
    errorHandler = require('errorhandler'),
    config = require('settings');

module.exports = function () {
    GLOBAL.app.use(compress())
        .set('port', config.port)
        .set('view engine', 'handlebars')
        .set('views', config.root + '/server/views')
        .engine('.html', viewHandler({
            extname: '.html',
            defaultLayout: 'main',
            layoutsDir: 'app/views/layouts',
            partialsDir: 'app/views/partials'
        }))
        .set('view engine', '.html')
        .enable('view cache')
        .use(logger(config.loggingLevel))
        .use(bodyParser.json())
        .use(methodOverride());
    if (process.env.NODE_ENV !== 'production') {
        app.use(errorHandler());
    }
};