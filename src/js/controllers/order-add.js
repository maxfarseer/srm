'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('orderAdd', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function orderAdd($scope, $rest) {

    $scope.order = {};

    $scope.order.saveStatus = 'Не сохранено';

    $scope.order.save = function() {
      $scope.order.saveStatus = 'Успешно сохранено';
    };

}];
