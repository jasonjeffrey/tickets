'use strict';

module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  public: {
    options: {
      jshintrc: 'public/.jshintrc'
    },
    src: [
      'public/scripts/**/*.js',
      '!public/scripts/vendor/**/*.js'
    ]
  },
  server: {
    options: {
      jshintrc: 'server/.jshintrc'
    },
    src: [
      'Gruntfile.js',
      'server/**/*.js'
    ]
  },
  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    src: ['test/**/*.js']
  }
};
