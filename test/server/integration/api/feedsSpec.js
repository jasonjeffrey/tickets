'use strict';

describe('Feeds API Integration tests', function () {
    var utils,
        FeedModel;
    before(function () {
        utils = require('../../../support/integrationUtils');
        FeedModel = require('../../../../server/models/Feeds');
    });

    beforeEach(function (done) {
        utils.startServer(done);
    });

    afterEach(function () {
        utils.stopServer();
    });


    describe('getFeeds', function () {
        beforeEach(function (done) {
            utils.emptyDatabase();
            utils.addDataToDatabase(FeedModel, 'feeds','allFeeds');
            setTimeout(done, 800);
        });

        it('should get all data from feeds', function (done) {
            var options = {
                hostname: 'localhost',
                port: 3001,
                path: '/api/feeds',
                method: 'GET'
            };

            utils.requestUrl(options, function (data) {
                expect(data.length).to.equal(4);
                done();
            });
        });

        it('should get all bintheknow data from feeds', function (done) {
            var options = {
                hostname: 'localhost',
                port: 3001,
                path: '/api/feeds/bintheknow',
                method: 'GET'
            };

            utils.requestUrl(options, function (data) {
                expect(data.length).to.equal(2);
                done();
            });
        });

        it('should get all bintheknow data from feeds lmited to 1', function (done) {
            var options = {
                hostname: 'localhost',
                port: 3001,
                path: '/api/feeds/bintheknow/1',
                method: 'GET'
            };

            utils.requestUrl(options, function (data) {
                expect(data.length).to.equal(1);
                done();
            });
        });
    });

});

