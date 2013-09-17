'use strict';

var app = angular.module('main', []);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/all.html",
    controller: "AllRecipesCtrl",
    resolve: {
      // recipesData is now available in the controller
      'recipesData': function(RecipesService) {
        return RecipesService.getIndex();
      }
    }
  })
  .when("/details/:id", {
    templateUrl: "views/details.html",
    controller: "DetailsCtrl",
    resolve: {
      // $routeParams does not work because it is only available after
      // the route has changed
      'recipeData': function($route, RecipesService) {
        return RecipesService.getOne($route.current.params.id);
      }
    }
  });
}]);

// get all the recipes
app.service("RecipesService", function($http) {
  var getIndexPromise = function() {
    return $http.get('js/recipes.json').then(function(response) {
      return response.data;
    }, function(reason) {
      alert("Failed fetching recipes (Status " + reason.status + ")");
    });
  };

  var getOnePromise = function(id) {
    // getIndexPromise is a function that returns a promise
    // thats why we can call then() here
    return getIndexPromise().then(function(data) {
      return _.find(data, function(r) { return r.id == id });
    });
  };

  return {
    getIndex: getIndexPromise,
    getOne: getOnePromise
  };
});

// when the controller is fired, recipeData is already loaded (-> resolve)
app.controller('AllRecipesCtrl', function($scope, recipesData) {
  $scope.recipes = recipesData;
});

app.controller('DetailsCtrl', function($scope, recipeData) {
  $scope.recipe = recipeData;
});
