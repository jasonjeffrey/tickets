'use strict';

var mockModel = function (results, error) {
    var errorObject = error || null,
        mockModel = function () {
            return {
                save: saveSpy
            };
        },
        saveSpy = sinon.spy();


    mockModel.find = sinon.spy(function () {
        return this;
    });
    mockModel.equals = sinon.spy(function () {
        return this;
    });
    mockModel.where = sinon.spy(function () {
        return this;
    });
    mockModel.limit = sinon.spy(function () {
        return this;
    });

    mockModel.exec = sinon.spy(function (callback) {
        callback(errorObject, results);
    });

    mockModel.saveSpy = saveSpy;

    return mockModel;
};

exports.getModel = function (results, error) {
    return mockModel(results, error);
};
