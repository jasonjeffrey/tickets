'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tickets - Local'
    },
    loggingLevel: 'dev',
    port: 3000,
    db: 'mongodb://localhost/bServerApp-development'
  },

  staging: {
    root: rootPath,
    app: {
      name: 'tickets - Local'
    },
    loggingLevel: 'dev',
    port: process.env.PORT,
    db: ''
  },

  production: {
    root: rootPath,
    app: {
      name: 'tickets - Live'
    },
    port: process.env.PORT,
    loggingLevel: 'tiny',
    db: ''
  }
};

module.exports = config[env];