var mainAppController = angular.module('mainAppController', []);

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


    });

}]);



//List controller
RecipeMixerModule.controller("ListController", function($scope, $location, callDbService) {


    $scope.submitForm = function() {
        $location.path('/view2');
    }

    var promise = callDbService.getRecipes()

    promise.then(function(data) {

        $scope.Recipe = data.data.Recipe;
        $scope.RecOrder = 'Title';


        for (var i = 0; i < $scope.Recipe.length; i++) {
            //console.log(data.data.Recipe[i].Level)
        }


        //get random Recipe
        $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];


    })

})