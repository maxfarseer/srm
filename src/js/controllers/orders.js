'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('orders', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function orders($scope, $rest) {


    function next(data) {
      if (data.orders.length > 0) {
        $scope.fillOrders(data);
      }
    }

    $scope.loadlOrders = function() {
      $scope.$rest.orders.load({}).$promise.then(next);
    };

    $scope.loadlOrders();

    $scope.fillOrders = function(data) {
      $scope.orders = data.orders;
    };

}];
