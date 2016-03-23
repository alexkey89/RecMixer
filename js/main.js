"use strict";

var mainAppController = angular.module('mainAppController', ['ngSanitize']);

//db services - promise

mainAppController.service('callDbService', function($http, $q) {

    var deferred = $q.defer()

    $http.get('js/db.json').then(function(data) {

        deferred.resolve(data)

    })

    this.getRecipes = function() {

        return deferred.promise;
    }


})



//Details controller
mainAppController.controller('DetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $http.get('js/db.json').success(function(data) {

        $scope.Recipe = data.Recipe;

        //determine which Recipe
        $scope.whichRecipe = $routeParams.RecId;

        //prev - next btn
        $routeParams.RecId > 0 ? $scope.prevRec = Number($routeParams.RecId) - 1 : $scope.prevRec = $scope.Recipe.length - 1;

        $routeParams.RecId < $scope.Recipe.length - 1 ? $scope.nextRec = Number($routeParams.RecId) + 1 : $scope.nextRec = 0;

        
        for (var i = 0; i < $scope.Recipe.length; i++) {

            $scope.Recipe[i].img = 'img/' + $scope.Recipe[i].Title.toLowerCase().replace(/ /g, '') + '.jpg';

        }




    });

}]);

//trust as html
mainAppController.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);



//List controller
RecipeMixerModule.controller("ListController", function($scope, $location, callDbService, $http) {

    $scope.filter = {};

    $scope.submitForm = function(filter,cat) {

        $location.path('/view2');        

    }


    var promise = callDbService.getRecipes()

    promise.then(function(data) {

        $scope.Recipe = data.data.Recipe;
        $scope.RecOrder = 'Title';

        //$scope.RecArray = Object.keys($scope.Recipe).map(key => $scope.Recipe[key])

        for (var i = 0; i < $scope.Recipe.length; i++) {

            $scope.Recipe[i].img = 'img/' + $scope.Recipe[i].Title.toLowerCase().replace(/ /g, '') + '.jpg';

            //get random Recipe
            $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];

        }



        //filter checkboxes
        $scope.filter = {};

        $scope.getCategories = function () {
            return ($scope.Recipe || []).map(function (w) {
                return w.category;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };
        
        $scope.filterByCategory = function (rec) {
            return $scope.filter[rec.category] || noFilter($scope.filter);
        };
        
        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    return false;
                }
            }
            return true;
        }



    })


})





