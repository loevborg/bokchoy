'use strict';

var app = angular.module('main', []);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/", {
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
        recipes = response.data;
      });
      return promise;
    },
    getAll: function() {
      return recipes;
    },
    getOne: function (id) {
      for (var i=0; i<recipes.length; i++) {
        if (recipes[i].id == id) {
          return recipes[i];
        }
      };
      return null;
    }
    };
});

app.controller('AllRecipesCtrl', function($scope, RecipesService, $timeout) {
  var r;

  r = RecipesService.getAll();
  if ( r ) { // are the recipes already loaded?
    $scope.recipes = r;
  } else {
    RecipesService.retrieve().then(function() { // defer
      $scope.recipes = RecipesService.getAll();
    });
  }
});

app.controller('DetailsCtrl', function($scope,$routeParams,RecipesService) {
  var id = $routeParams.id;

  if ( RecipesService.getAll() ) { // are the recipes already loaded?
    $scope.recipe = RecipesService.getOne(id);
  } else {
    RecipesService.retrieve().then(function() { // defer
      $scope.recipe = RecipesService.getOne(id);
    });
  }
});
