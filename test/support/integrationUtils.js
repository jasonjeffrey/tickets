'use strict';

var db, server, utils,
    fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose');

utils = function () {};

function startCleanDatabase() {
    mongoose.connect('mongodb://localhost/bServerApp-testing');
    db = mongoose.connection;

    utils.emptyDatabase();
}

utils.startServer = function (callback) {
    var childProcess = require('child_process').spawn,
        environment = process.env;

    environment.NODE_ENV = 'testing';

    startCleanDatabase();

    server = childProcess('node', ['server'], {env: environment});

    server.stdout.once('data', function () {
        setTimeout(callback, 1000);
    });
};

utils.stopServer = function () {
    server.kill();
    utils.emptyDatabase();
    mongoose.connection.close();
};


utils.addDataToDatabase = function (Model, fileRef, dataSet) {
    var data = JSON.parse(fs.readFileSync('test/data/' + fileRef + '.json'));

    data[dataSet].forEach(function (record) {
        var dbRecord = new Model(record);

        dbRecord.save();
    });
};

utils.emptyDatabase = function () {
    db.db.dropDatabase();
};

utils.requestUrl = function (options, callback, data) {
    var outputData = '',
        req = http.request(options, function(res) {
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            outputData += chunk;
        });

        res.on('end', function () {
            callback(JSON.parse(outputData));
        });
    });

    if(data) {
        req.write(JSON.stringify(data));
    }

    req.end();
};

module.exports = utils;
