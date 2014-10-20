'use strict';

module.exports = function () {
  return {
    options: {
      outputStyle: 'compressed',
      sourceMap: true
    },
    dist: {
      files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'public/styles/',
          ext: '.css'
      }]
    }
  };
};


