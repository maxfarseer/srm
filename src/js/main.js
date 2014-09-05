'use strict';

var $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

var app = angular.module('srm', [uiRouter,'ngResource']);
require('./services/rest').inject(app);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/jstest');

  $stateProvider
  .state('registration', {
    url: '/registration',
    templateUrl: '/js/views/registration.html',
    controller: require('./controllers/registration').inject(app)
  })
  .state('orders', {
    url: '/orders',
    templateUrl: '/js/views/orders.html',
    controller: require('./controllers/orders').inject(app)
  })
  .state('order', {
    url: '/order',
    templateUrl: '/js/views/order.html',
    controller: require('./controllers/order').inject(app)
  })
  .state('addorder', {
    url: '/order/add',
    templateUrl: '/js/views/order-add.html',
    controller: require('./controllers/order-add').inject(app)
  })
  .state('users', {
    url: '/users',
    templateUrl: '/js/views/users.html',
    controller: require('./controllers/users').inject(app)
  })
  .state('adduser', {
    url: '/users/add',
    templateUrl: '/js/views/user-add.html',
    controller: require('./controllers/user-add').inject(app)
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
