'use strict';

module.exports = function () {
  return {
    options: {
      jshintrc: true
    },
    all: [
      'Gruntfile.js',
      'app/**/*.*',
      'grunt/**/*.*',
      'public/scripts/elements/**/*',
      '!app/views/**/*'
    ]
  };
};
