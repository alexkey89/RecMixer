"use strict";

var mainAppController = angular.module('mainAppController', ['ngSanitize']);

//Details controller
mainAppController.controller('DetailsController', ['$scope', '$http', '$rootScope', '$routeParams', 'db', function ($scope, $http, $rootScope, $routeParams, db) {

  $rootScope.$on('data_loaded', function () {
    $scope.Recipe = db.data.Recipe;
  })

  $scope.Recipe = db.data.Recipe;

  //determine which Recipe
  $scope.whichRecipe = $routeParams.RecId;

  //prev - next btn
  $routeParams.RecId > 0 ? $scope.prevRec = Number($routeParams.RecId) - 1 : $scope.prevRec = $scope.Recipe.length - 1;

  $routeParams.RecId < $scope.Recipe.length - 1 ? $scope.nextRec = Number($routeParams.RecId) + 1 : $scope.nextRec = 0;


  for (var i = 0; i < $scope.Recipe.length; i++) {

    $scope.Recipe[i].img = 'img/' + $scope.Recipe[i].Title.toLowerCase().replace(/ /g, '') + '.jpg';

  }


}]);

//trust as html
mainAppController.filter("sanitize", ['$sce', function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  }
}]);


//List controller
RecipeMixerModule.controller("ListController", function ($scope, $location, $rootScope, filterSettings, db, $http) {

  $rootScope.$on('data_loaded', function () {
    $scope.Recipe = db.data.Recipe;
    $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];

  })

  $scope.filter = filterSettings;

  $scope.submitForm = function (filter, cat) {

    $location.path('/view2');

  }

<<<<<<< Updated upstream
  $scope.Recipe = db.data.Recipe;
  $scope.RecOrder = 'Title';

  //get random Recipe
  $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];

  //$scope.RecArray = Object.keys($scope.Recipe).map(key => $scope.Recipe[key])
=======
        //filter checkboxes
        $scope.filter = {};
>>>>>>> Stashed changes


  $scope.getCategories = function () {
    return ($scope.Recipe || []).map(function (w) {
      return w.category;
    }).filter(function (w, idx, arr) {
      return arr.indexOf(w) === idx;
    });
  };

<<<<<<< Updated upstream
  $scope.filterByCategory = function (rec) {
    return filterSettings[rec.category] || noFilter(filterSettings);
  };
=======
         $scope.ShowSelected = function() {
              console.log($scope.filter);
              alert(JSON.stringify($scope.filter));
         };


>>>>>>> Stashed changes

  function noFilter(filterObj) {
    for (var key in filterObj) {
      if (filterObj[key]) {
        return false;
      }
    }
    return true;
  }


})





