'use strict';

var $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

var app = angular.module('srm', [uiRouter]);
require('./services/rest').inject(app);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/jstest');

  $stateProvider
  .state('registration', {
    url: '/registration',
    templateUrl: '/js/views/registration.html',
    controller: require('./controllers/registration').inject(app)
  })
  .state('jstest', {
    url: '/jstest',
    templateUrl: '/js/views/jstest.html',
    controller: require('./controllers/jstest').inject(app)
  })
  ;
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
    $rootScope.$rest = $rest;
    $rootScope.root = $rootScope;
}]);
