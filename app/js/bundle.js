;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9wZS9wcmcvYm9rY2hveS9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ21haW4nLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdCYXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCl7XG5cblx0JGh0dHAoe21ldGhvZDogJ0dFVCcsIHVybDogJ2pzL3JlY2lwZXMuanNvbid9KS5cbiAgICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5yZXN1bHRzID0gZGF0YTtcbiAgICB9KS5cbiAgICBlcnJvcihmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXN0IGJhZCcpO1xuICAgIH0pO1xuXG5cblxuXG4gICRzY29wZS5hZGRJdGVtID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLnJlc3VsdHMucHVzaCh7XCJuYW1lXCI6ICRzY29wZS5uZXdOYW1lfSk7XG4gIH1cblxuXG5cblxufSk7XG4iXX0=
;