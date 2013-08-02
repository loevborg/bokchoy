'use strict';

var app = angular.module('main', []);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/all.html",
    controller: "AllRecipesCtrl",
    // by using resolve the controller gets loaded when the xhr request finished
    resolve: {
      'recipesData': function(RecipesService) {
        return RecipesService.promise;
      }
    }
  })
  .when("/details/:id", {
    templateUrl: "views/details.html",
    controller: "DetailsCtrl"
  });
}]);

// get all the recipes
app.service("RecipesService", function($http) {
  var recipes = new Array;

  // a service in Angular is a singleton, so this is only executed once
  var promise = $http.get('js/recipes.json').then(function(response) {
    recipes = response.data;
  }, function(reason) {
    alert("Failed fetching recipes (Status " + reason.status + ")");
  });

  return {
    promise: promise,
    getAll: function() {
      return recipes;
    },
    getOne: function (id) {
      return _.find(recipes, function(r) { return r.id == id });
    }
  };
});

app.controller('AllRecipesCtrl', function($scope, $timeout, RecipesService) {
  $scope.recipes = RecipesService.getAll();
});

app.controller('DetailsCtrl', function($scope, $routeParams, RecipesService) {
  $scope.recipe = RecipesService.getOne($routeParams.id);
});
