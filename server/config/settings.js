'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/../..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Tickets - Local'
    },
    loggingLevel: 'dev',
    port: 3000,
    db: 'mongodb://localhost/bServerApp-development'
  },

  testing: {
    root: rootPath,
    app: {
      name: 'bServer - Integration tests'
    },
    port: 3001,
    loggingLevel: 'dev',
    db: 'mongodb://localhost/bServerApp-testing'
  },

  staging: {
    root: rootPath,
    app: {
      name: 'bServer - Staging'
    },
    port: process.env.PORT,
    loggingLevel: 'dev',
    db: 'mongodb://staging:Ab123456@ds035787.mongolab.com:35787/bServerDBStaging'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bServer - Live'
    },
    port: process.env.PORT,
    loggingLevel: 'tiny',
    db: 'mongodb://BServerDB:0CerMRmgLKQC4TDPEwIC9B._2Cb5SemXDLCv6dDNwHo-@ds045077.mongolab.com:45077/BServerDB'
  }
};

module.exports = config[env];
