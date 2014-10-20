'use strict';

var express = require('express'),
    config = require('../config/settings');

module.exports = {
    getRoutes: function () {
        GLOBAL.app.use(express.static(config.root + '/public'));

        GLOBAL.app.get('*', function (req, res) {
            res.render('seats');
        });
    }
};
