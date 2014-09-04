'use strict';

var sayHello = require('./modules/say-hello'),
    $ = require('jquery'),
    angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    ngResource = require('npm-angular-resource')(window,angular);

console.log(sayHello.greetings('Max P.'));

var app = angular.module('offlined', [uiRouter]);
require('./services/rest').inject(app);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('findbyid');

  $stateProvider
  .state('findbyid', {
    url: '/find/byid',
    templateUrl: '/js/views/find/byid.html',
    controller: require('./controllers/findbyid').inject(app)
  })
  .state('findbyclan', {
    url: '/find/byclan',
    templateUrl: '/js/views/find/byclan.html',
    controller: require('./controllers/findbyclan').inject(app)
  })
  .state('playerprofile', {
    url: '/find/playerprofile',
    templateUrl: '/js/views/profile/player.html',
    controller: require('./controllers/profile/player').inject(app)
  })
  .state('clanprofile', {
    url: '/find/clanprofile',
    templateUrl: '/js/views/profile/clan.html',
    controller: require('./controllers/profile/clan').inject(app)
  })
  .state('balance', {
    url: '/balance',
    templateUrl: '/js/views/balance.html',
    controller: require('./controllers/balance').inject(app)
  });
}]);

app.run(['$rootScope','$rest', function ($rootScope, $rest) {
    $rootScope.$rest = $rest;
    $rootScope.root = $rootScope;
}]);
