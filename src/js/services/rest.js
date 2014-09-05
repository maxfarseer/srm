'use strict';

exports.inject = function(app) {

  //var ngResource = require('npm-angular-resource')(window,angular);
  app.factory('$rest', exports.factory);
  return exports.factory;
};

exports.factory = ['$resource', function ($resource) {

    var root = 'http://localhost:8002/';
    var rest = {
      orders: $resource(root+ 'json/orders.json', {}, {
        load: {method: 'GET'}
      }),
      order: $resource(root+ 'json/order.json', {}, {
        load: {method: 'GET'}
      }),
      users: $resource(root+ 'json/users.json', {}, {
        load: {method: 'GET'}
      })
    };

    return rest;
}];
