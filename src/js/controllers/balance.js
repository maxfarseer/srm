'use strict';

exports.inject = function(app) {

  app.controller('balance', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', function findById($scope) {

  $scope.balance = {};

}];
