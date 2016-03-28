"use strict";

var mainAppController = angular.module('mainAppController', ['ngAnimate']);

//Details controller
mainAppController.controller('DetailsController', ['$scope', '$http', '$rootScope', '$routeParams', 'db', function ($scope, $http, $rootScope, $routeParams, db) {

  $scope.pageClass = 'page-details';

  $rootScope.$on('data_loaded', function () {
    $scope.Recipe = db.data.Recipe;
  })

  $scope.Recipe = db.data.Recipe;

  //determine which Recipe
  $scope.whichRecipe = $routeParams.RecId;

  //prev - next btn
  $routeParams.RecId > 0 ? $scope.prevRec = Number($routeParams.RecId) - 1 : $scope.prevRec = $scope.Recipe.length - 1;

  $routeParams.RecId < $scope.Recipe.length - 1 ? $scope.nextRec = Number($routeParams.RecId) + 1 : $scope.nextRec = 0;

  //set images
  for (var i = 0; i < $scope.Recipe.length; i++) {

    $scope.Recipe[i].img = 'img/' + $scope.Recipe[i].Title.toLowerCase().replace(/ /g, '') + '.jpg';

  }


}]);



//List controller
RecipeMixerModule.controller("ListController", function ($scope, $location, $rootScope, filterSettings, db, $http) {

  $scope.pageClass = 'page-list';

  $rootScope.$on('data_loaded', function () {
    $scope.Recipe = db.data.Recipe;
    $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];

  })

  $scope.filter = filterSettings;

  $scope.submitForm = function (filter, cat) {

    $location.path('/view2');

  }

  $scope.Recipe = db.data.Recipe;
  $scope.RecOrder = 'Title';
  $scope.userLimit = 'all';

  //get random Recipe
  $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];


  $scope.getCategories = function () {
    return ($scope.Recipe || []).map(function (w) {
      return w.category;
    }).filter(function (w, idx, arr) {
      return arr.indexOf(w) === idx;
    });
  };

  $scope.filterByCategory = function (rec) {
    return filterSettings[rec.category] || noFilter(filterSettings);
  };

  function noFilter(filterObj) {
    for (var key in filterObj) {
      if (filterObj[key]) {
        return false;
      }
    }
    return true;
  }

//test filter
//$scope.glutenAllFree = 'Gluten Free';

//end of test filter


})

//global - nav menu

RecipeMixerModule.controller('menuCtrl', function(){

var open = document.querySelector('.open');

open.addEventListener('click', function(event){
  this.classList.add('oppenned')
  event.stopPropagation()
})

document.body.addEventListener('click', function(event){
  open.classList.remove('oppenned')
})

var cls = document.getElementsByClassName('cls');
for (var i = 0; i < cls.length; i++ ) {
    cls[i].addEventListener( 'click', function( event ) {
       open.classList.remove('oppenned')
       event.stopPropagation()
    });
}

});





