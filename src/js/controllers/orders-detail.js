'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('ordersDetail', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', '$stateParams', function ordersDetail($scope, $rest, $stateParams) {

    function next(data) {
      if (data.order.length > 0) {
        $scope.fillOrder(data);
      }
    }

    $scope.loadOrder = function() {
      $scope.$rest.order.load({}).$promise.then(next);
    };

    $scope.loadOrder();

    $scope.fillOrder = function(data) {
      $scope.order = data.order;
    };

    $scope.orderId = $stateParams.orderId;

}];
