'use strict';

exports.inject = function(app) {

  //var ngResource = require('npm-angular-resource')(window,angular);
  app.factory('$rest', exports.factory);
  return exports.factory;
};

exports.factory = ['$resource', function ($resource) {

    var root = 'http://localhost:8002/';
    //var root = 'http://centersem.ru:1488/api/v1/';

    /*var rest = {
      orders: $resource(root+ 'order/', {'format': 'json'}, {
        load: {method: 'GET'}
      }),
      order: $resource(root+ 'json/order.json', {}, {
        load: {method: 'GET'}
      }),
      users: $resource(root+ 'userprofile/', {'format': 'json'}, {
        load: {method: 'GET'}
      })
    };*/

    var rest = {
      orders: $resource(root+ 'json/orders.json', {'format': 'json'}, {
        load: {method: 'GET'}
      }),
      order: $resource(root+ 'json/order.json', {}, {
        load: {method: 'GET'}
      }),
      users: $resource(root+ 'json/users.json', {'format': 'json'}, {
        load: {method: 'GET'}
      })
    };

    return rest;
}];
