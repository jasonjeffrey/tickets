'use strict';

module.exports = {
    unit: {
        src: ['test/server/unit/**/*Spec.js'],
        options: {
            ui: 'bdd',
            reporter: 'spec'
        }
    },
    integration: {
        src: ['test/server/integration/**/*Spec.js'],
        options: {
            ui: 'bdd',
            reporter: 'spec',
            timeout: 10000
        }
    }
};
