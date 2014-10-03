'use strict';
var models, mongooseModelStub, mongooseSchemaStub,
    fs = require('fs'),
    modelsPath = '../../../../server/models/',
    absModelsPath = __dirname + '/' + modelsPath;

models = fs.readdirSync(absModelsPath);

function stubMongoose(mongoose, modelSpy) {
    mongooseModelStub = sinon.stub(mongoose, 'model', modelSpy);
    mongooseSchemaStub = sinon.stub(mongoose, 'Schema', sinon.spy(function () {
        return {
            virtual: function () {
                return this;
            },
            get: function () {
                return this;
            },
            statics: {}
        };
    }));
}

function restoreMongoose() {
    mongooseModelStub.restore();
    mongooseSchemaStub.restore();
}

function setTestsForModel(modelName) {
    var model, mongoose, modelSpy,
        modelPath = modelsPath + modelName;

    describe('Model: ' + modelName, function () {
        before(function () {
            mongoose = require('mongoose');
        });

        beforeEach(function () {
            modelSpy = sinon.spy(function () {
                return {};
            });

            stubMongoose(mongoose, modelSpy);
            model = require(modelPath);
        });

        afterEach(function () {
            mongoose.models = {};
            mongoose.modelSchemas = {};
            delete require.cache[require.resolve(modelPath)];
            restoreMongoose();
        });

        it('should not be undefined', function () {
            expect(model).to.be.ok;
        });

        it('should only call init model function once', function () {
            model = require(modelPath);
            expect(modelSpy.calledOnce).to.be.ok;
        });
    });
}

models.forEach(function (model) {
    setTestsForModel(model);
});
