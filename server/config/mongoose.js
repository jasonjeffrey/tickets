'use strict';

var mongoose = require('mongoose'),
  db;

module.exports = function (config) {
  mongoose.connect(config.db);
  db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
};

