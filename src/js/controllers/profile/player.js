'use strict';

exports.inject = function(app) {

  app.controller('playerprofile', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', function findById($scope) {

  $scope.playerprofile = {};

}];
