'use strict';

var fs = require('fs'),
    FeedModel = require('../models/Feeds'),

    servicesPath = '../services/';

exports.updateFeedsInDB = function () {
    var files = fs.readdirSync(__dirname + '/' + servicesPath);

    files.forEach(function (file) {
        var service = require(servicesPath + file);

        if (service.updateFeedInDB) {
            service.updateFeedInDB();
        }
    });
};

exports.getFeed = function (request, response) {

    var handlerFeedData = function (err, feed) {
        if (err) {
            response.statusCode = 500;
            response.send();
        } else {
            response.json(feed);
        }
    };

    FeedModel.getFeed(handlerFeedData, request.params.feed, request.params.limit);
};
