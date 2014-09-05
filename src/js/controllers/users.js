'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('orders', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function orders($scope, $rest) {


    function next(data) {
      if (data.users.length > 0) {
        $scope.fillUsers(data);
      }
    }

    $scope.loadUsers = function() {
      $scope.$rest.users.load({}).$promise.then(next);
    };

    $scope.loadUsers();

    $scope.fillUsers = function(data) {
      $scope.users = data.users;
    };

}];
