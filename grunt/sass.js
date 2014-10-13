module.exports = function () {
  return {
    options: {
      includePaths: [
          'public/scripts/vendor/bootstrap/assets/stylesheets',
          'public/scripts/vendor/bootstrap/assets/stylesheets/bootstrap'
      ],
      outputStyle: 'compressed',
      sourceMap: true
    },
    dist: {
      files: {
        'public/styles/main.css': 'sass/public/main.scss'
      }
    }
  }
};


