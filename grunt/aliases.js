'use strict';

module.exports = function () {
  return {
    default: [
      'test',
      'build'

    ],
    test: [
      'jshint'
    ],
    build: [
      'sass:dist'
    ]
  };
};