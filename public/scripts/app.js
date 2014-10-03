'use strict';

angular
  .module('bServerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {})
      .otherwise({
        redirectTo: '/'
      });
  });
