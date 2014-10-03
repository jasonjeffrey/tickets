'use strict';

describe('b-intheknow service', function () {
    var service, rewire, events,
        constants, fs, mockModel,
        servicePath = '../../../../server/services/bintheknow';

    before(function () {
        events = require('events');
        rewire = require('rewire');
        fs = require('fs');
        constants = require('../../../../server/config/constants');
        mockModel = require('../../mocks/mockModel');
    });

    beforeEach(function () {
        service = rewire(servicePath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(servicePath)];
    });

    it('should not be undefined', function () {
        expect(service).to.be.ok;
    });

    describe('updateFeedInDB Function', function () {
        it('should call the tumblr API and get a data response', function () {
            var mockHttpResponse,
                addNewItemsToDBMock = sinon.spy(),
                httpMock = {
                    get: sinon.spy(function (url, callback) {
                        mockHttpResponse = new events.EventEmitter();
                        callback(mockHttpResponse);
                    })
                };

            service.__set__('http', httpMock);
            service.__set__('exports.addNewItemsToDB', addNewItemsToDBMock);

            service.updateFeedInDB();
            mockHttpResponse.emit('data', '{}');
            mockHttpResponse.emit('end');

            expect(httpMock.get.calledOnce).to.be.ok;
            expect(addNewItemsToDBMock.calledOnce).to.be.ok;
        });
    });

    describe('addNewItemsToDB Function', function () {
        it('should add new records to the DB', function () {
            var model = mockModel.getModel([]),
                feedData = JSON.parse(fs.readFileSync(__dirname + '/../../../data/bintheknow.json',
                    {encoding: 'utf8'}));

            service.__set__('FeedModel', model);

            service.addNewItemsToDB(feedData);

            expect(model.exec.calledOnce).to.be.ok;
            expect(model.saveSpy.calledOnce).to.be.ok;
        });
    });
});
