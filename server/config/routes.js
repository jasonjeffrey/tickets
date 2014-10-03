'use strict';

var express = require('express'),
    feedController = require('../controllers/feed');

module.exports = function (app, config) {

    app.get('/api/feeds/:feed?/:limit?', feedController.getFeed);

    app.use(express.static(config.root + '/public'));
    app.get('*', function (req, res) {
        res.render('index');
    });
};
