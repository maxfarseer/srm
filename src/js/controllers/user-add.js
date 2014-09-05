'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('userAdd', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function userAdd($scope, $rest) {

    $scope.user = {};

    $scope.user.saveStatus = 'Не сохранено';

    $scope.user.save = function() {
      $scope.user.saveStatus = 'Успешно сохранено';
    };

}];
