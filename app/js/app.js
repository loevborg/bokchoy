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
        return RecipesService.getIndexPromise();
      }
    }
  })
  .when("/details/:id", {
    templateUrl: "views/details.html",
    controller: "DetailsCtrl",
    resolve: {
      'recipeData': function($route, RecipesService) {
        return RecipesService.getOnePromise($route.current.params.id);
      }
    }
  });
}]);

// get all the recipes
app.service("RecipesService", function($http) {
  // a service in Angular is a singleton, so this is only executed once
  var getIndexPromise = function() {
    console.log("getting the data now, all of it")
    return $http.get('js/recipes.json').then(function(response) {
      return response.data;
    }, function(reason) {
      alert("Failed fetching recipes (Status " + reason.status + ")");
    });
  }

  var getOnePromise = function(id) {
    console.log("getting the data now, one only")
    return $http.get('js/recipes.json').then(function(response) {
      return _.find(response.data, function(r) { return r.id == id });
    }, function(reason) {
      alert("Failed fetching recipe (Status " + reason.status + ")");
    });
  }

  return {
    getIndexPromise: getIndexPromise,
    getOnePromise: getOnePromise
  };
});

app.controller('AllRecipesCtrl', function($scope, recipesData) {
  $scope.recipes = recipesData;
});

app.controller('DetailsCtrl', function($scope, recipeData) {
  $scope.recipe = recipeData;
});
