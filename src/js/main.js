'use strict';

var $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

var app = angular.module('srm', [uiRouter,'ngResource']);
require('./services/rest').inject(app);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  //var staticApp = '/static/app'; //for develop
  var staticApp = '';

  $urlRouterProvider.otherwise('/registration');

  $stateProvider
  .state('registration', {
    url: '/registration',
    templateUrl: staticApp + '/js/views/registration.html',
    controller: require('./controllers/registration').inject(app)
  })
  .state('orders', {
    url: '/orders',
    templateUrl: staticApp + '/js/views/orders.html',
    controller: require('./controllers/orders').inject(app)
  })
  .state('item', {
    url: "/orders/:orderId",
    //url: "/orders/{orderId:[0-9]{1,4}}", //regEx example in url
    templateUrl: staticApp + '/js/views/orders-detail.html',
    controller: require('./controllers/orders-detail').inject(app)
    /*controller: function ($stateParams) {
        expect($stateParams).toBe({contactId: 42});
    }*/
  })
  .state('order', {
    url: '/order',
    templateUrl: staticApp + '/js/views/order.html',
    controller: require('./controllers/order').inject(app)
  })
  .state('addorder', {
    url: '/order/add',
    templateUrl: staticApp + '/js/views/order-add.html',
    controller: require('./controllers/order-add').inject(app)
  })
  .state('users', {
    url: '/users',
    templateUrl: staticApp + '/js/views/users.html',
    controller: require('./controllers/users').inject(app)
  })
  .state('adduser', {
    url: '/users/add',
    templateUrl: staticApp + '/js/views/user-add.html',
    controller: require('./controllers/user-add').inject(app)
  })
  .state('jstest', {
    url: '/jstest',
    templateUrl: staticApp + '/js/views/jstest.html',
    controller: require('./controllers/jstest').inject(app)
  })
  ;
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
    $rootScope.$rest = $rest;
    $rootScope.root = $rootScope;
}]);
