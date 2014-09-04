'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('findByClan', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function findById($scope, $rest) {

    $scope.clan = {};

    $scope.clan.name = 'Пираты';

    $scope.clan.rating = {
      from: 0,
      to: 4000
    };

    // 30 days = 2592000000 ms
    $scope.clan.createDate = {
      from: new Date(Date.now() - 2592000000),
      to: new Date()
    };

    $scope.clan.count = {
      from: 0,
      to: 50
    };

}];
