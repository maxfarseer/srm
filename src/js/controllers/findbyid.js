'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('findById', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function findById($scope, $rest) {

    $scope.player = {};
    $scope.player.name = 'Vasya';
    $scope.player.selectedQHlevel = 1;

    $scope.player.qhlevels = [1,2,3,4,5,6,7,8,9,10];

    $scope.player.rating = {
      from: 0,
      to: 4000
    };

    // 30 days = 2592000000 ms
    $scope.player.installDate = {
      from: new Date(Date.now() - 2592000000),
      to: new Date()
    };

    $scope.player.findById = function(id) {
      console.log(id);
      var a = $rest.qq('get json');
      console.log(a);
    };

    function next(data) {
      $scope.commentators = data.result;
    }

    $scope.restTest = function() {

      //$scope.$rest.commentators.load({}).$promise.then(next);
    };

}];
