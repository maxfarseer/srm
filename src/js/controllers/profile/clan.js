'use strict';

exports.inject = function(app) {

  app.controller('clanprofile', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', function findById($scope) {

  $scope.clanprofile = {};

}];
