'use strict';

describe('feed Controller', function () {
  var controller, rewire, constants, fs,
    controllerPath = '../../../../server/controllers/feed';

  before(function () {
    rewire = require('rewire');
    fs = require('fs');
    constants = require('../../../../server/config/constants');
  });

  beforeEach(function () {
    controller = rewire(controllerPath);
  });

  afterEach(function () {
    delete require.cache[require.resolve(controllerPath)];
  });

  it('should not be undefined', function () {
    expect(controller).to.be.ok;
  });

    describe('updateFeedsInDB function', function () {
        it('should call each service once', function () {
            var mockService = require('../../mocks/mockService'),
                fsMock = {
                    readdirSync: function () {
                        return['../../test/server/mocks/mockService'];
                    }
                };

            controller.__set__('fs', fsMock);

            controller.updateFeedsInDB();

            expect(mockService.updateFeedInDB.calledOnce).to.be.ok;
        });
    });

    describe('getFeed function', function () {
        var mockModel;

        beforeEach(function () {
            mockModel = require('../../mocks/mockModel').getModel();
        });

        function setupController(error, modelResponse) {
            mockModel.getFeed = sinon.spy(function (callback) {
                callback(error, modelResponse);
            });

            controller.__set__('FeedModel', mockModel);
        }

        it('should get a successful feeds response from the model', function () {
            var modelResponse = 'this is a good response',
                jsonSpy = sinon.spy(),
                requestParams = {feed: 'test', limit: 5};

            setupController(null, modelResponse);

            controller.getFeed({params: requestParams}, {json: jsonSpy});

            expect(jsonSpy.calledOnce).to.be.ok;
            expect(mockModel.getFeed.args[0][1]).to.equal(requestParams.feed);
            expect(mockModel.getFeed.args[0][2]).to.equal(requestParams.limit);
        });

        it('should get a failed feeds response from the model', function () {
            var modelResponse = 'this is a bad response',
                sendSpy = sinon.spy(),
                responseObject = {statusCode: 200, send: sendSpy};

            setupController('err', modelResponse);

            controller.getFeed({params: {}}, responseObject);

            expect(sendSpy.calledOnce).to.be.ok;
            expect(responseObject.statusCode).to.equal(500);
        });
    });

});
