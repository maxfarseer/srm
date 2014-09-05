'use strict';

exports.inject = function(app) {

  require('./../services/rest').inject(app);
  app.controller('jsTest', exports.controller);

  return exports.controller;
};

exports.controller = ['$scope', '$rest', function jsTest($scope, $rest) {

    var $ = require('jquery');

    // получить промо код
    /*(function() {

      var clientId;

      clientId = 123;

      var xhr = new XMLHttpRequest();
      var outputElem = document.getElementById('srm-promo');

      xhr.open('GET', 'http://centersem.ru:1488/data/coupons/generate/'+clientId+'/', true);

      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          // status=0 при ошибках сети, иначе status=HTTP-код ошибки
          console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
          return;
        }
        // обработать результат
        outputElem.innerHTML = JSON.parse(xhr.responseText).promo;
      }

      outputElem.innerHTML = '...';
      xhr.send(null);

    })();*/

    // ---------

    //отправить гет-запрос с покупками
    //1) глобальный объект от клиента с массивом товаров
    window.bananaCrm = window.bananaCrm || {};

    window.bananaCrm.basket = window.bananaCrm.basket || {};

    window.bananaCrm.basket.sku = [];
    window.bananaCrm.basket.price = [];
    window.bananaCrm.basket.name = [];
    window.bananaCrmItems = [];

    $.each($('[data-bcrm="sku"]'), function(index,item) {
      window.bananaCrm.basket.sku.push($(item).text());
    });

    $.each($('[data-bcrm="name"]'), function(index,item) {
      window.bananaCrm.basket.name.push($(item).text());
    });

    $.each($('[data-bcrm="price"]'), function(index,item) {
      window.bananaCrm.basket.price.push($(item).text());
    });

    for (var i=0; i<window.bananaCrm.basket.sku.length; i++) {
      window.bananaCrmItems.push({
        sku:window.bananaCrm.basket.sku[i],
        price:window.bananaCrm.basket.price[i],
        name:window.bananaCrm.basket.name[i]
      });
    };

    //2) посылка нам гет запроса
    (function() {
      var d = {};
      //temp
      var cid = 111,
          orderid = 333;

      d.cid = cid;
      d.orderid = orderid;

      d.items = window.bananaCrmItems;

      d = encodeURIComponent(JSON.stringify(d));

      var s = document.createElement('script');
      var x = document.getElementsByTagName('script')[0];
      s.type = 'text/javascript';
      s.async = true;
      s.src = ('https:'==document.location.protocol?'https://':'http://') +
      'centersem.ru:1488/data/process/order/a252bf4791776be734a6ac59d411127c/?order='+ d;
      x.parentNode.insertBefore( s, x );
    })();


    function next(data) {
      $scope.commentators = data.result;
    }

    $scope.restTest = function() {
      $scope.$rest.commentators.load({}).$promise.then(next);
    };

}];
