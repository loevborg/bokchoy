'use strict';

var app = angular.module('main', []);

// achso!

app.config(["$routeProvider", function($routeProvider){
  $routeProvider.when("/", {
    templateUrl: "views/all.html",
    controller: "AllRecipesCtrl"
  })
  .when("/details/:id", {
    templateUrl: "views/details.html",
    controller: "DetailsCtrl"
  });
}]);

app.service("RecipesService", function($http) {
  var recipes;

  // get all the recipes
  //
  // FIXME: no error handling yet!

  return {
    retrieve: function() {
      var promise = $http.get('js/recipes.json').
      then(function(response) {
        console.log("foo bar");
        recipes = response.data;
        });
      return promise;
    },
    getAll: function() {
      return recipes;
    }
//    getOne: function (id) {
//    }
    };
});

app.controller('AllRecipesCtrl', function($scope, RecipesService, $timeout){
  var r;

  console.log("blubb");

  r = RecipesService.getAll();
  if ( r ) {
    $scope.recipes = r;
  } else {
    RecipesService.retrieve().then(function() {
      $scope.recipes = RecipesService.getAll();
    });
  }
});

app.controller('DetailsCtrl', function($scope){
  $scope.recipe = {title:"bla", body:"lalal"};
});
