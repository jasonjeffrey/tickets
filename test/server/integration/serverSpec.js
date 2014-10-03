'use strict';

describe('Server Loading Integration tests', function () {
    var utils;
    before(function () {
        utils = require('../../support/integrationUtils');
    });

    beforeEach(function (done) {
        utils.startServer(done);
    });

    afterEach(function () {
        utils.stopServer();
    });

    describe('server loading to idle', function () {
        it('should call all services and populate the db', function () {
            var FeedModel = require('../../../server/models/Feeds');

            FeedModel.find({}, function (err, records) {
                expect(err).to.not.be.ok;
                expect(records.length).to.be.greaterThan(0);
            });
        });
    });
});

