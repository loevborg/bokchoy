'use strict';

var app = angular.module('main', []);

app.controller('BarCtrl', function($scope, $http){

	$http({method: 'GET', url: 'js/recipes.json'}).
    success(function(data) {
      $scope.results = data;
    }).
    error(function() {
      console.log('test bad');
    });




  $scope.addItem = function() {
    $scope.results.push({"name": $scope.newName});
  }




});
