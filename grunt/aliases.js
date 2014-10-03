'use strict';

module.exports = {
    'default': [
        'develop',
        'watch'
    ],

    'test-server-unit': [
        'jshint',
        'mocha-chai-sinon:unit'
    ],

    'test-server-integration': [
        'jshint',
        'mocha-chai-sinon:integration'
    ],

    'test': [
        'jshint',
        'mocha-chai-sinon:unit',
        'mocha-chai-sinon:integration'
    ]
};


