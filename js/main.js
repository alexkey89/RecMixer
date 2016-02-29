
var mainAppController = angular.module('mainAppController', []);

mainAppController.controller('ListController', ['$scope', '$http', function ($scope, $http, $randomQuote){

    $http.get('js/db.json').success(function(data){

        $scope.Recipe = data.Recipe;
        $scope.RecipeOrder = 'name';

        //get randome Recipe
        $scope.randomRecipe = $scope.Recipe[Math.floor(Math.random() * $scope.Recipe.length)];
       
    });

}]);


mainAppController.controller('DetailsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){

    $http.get('js/db.json').success(function(data){

        $scope.Recipe = data.Recipe;

        //determine which Recipe
        $scope.whichRecipe = $routeParams.RecId;

        //prev - next btn
        $routeParams.RecId > 0 ? $scope.prevRec = Number($routeParams.RecId)-1 : $scope.prevRec = $scope.Recipe.length-1;

        $routeParams.RecId < $scope.Recipe.length-1 ? $scope.nextRec = Number($routeParams.RecId)+1 : $scope.nextRec = 0;


    });

}]);





// //ajax request
//     RecipeMixerModule.service('simpleService', function($http, $q){
            
//         var deferred = $q.defer()
            
//             $http.get('js/db.json').then(function(data){
                
//                 deferred.resolve(data)
            
//             })

		
//      this.getRecipes = function(){
	 	
//         return deferred.promise;
// 	 }q

    			
//     })


//     //controller
// 	RecipeMixerModule.controller("mainController", function($scope,simpleService) {

//             var promise = simpleService.getRecipes()

//             promise.then(function(data){

//                 $scope.isArray = angular.isArray;
//                 $scope.Recipes = data.data.Recipe;
                    
//                 for (var i=0; i< $scope.Recipes.length; i++){
//                     //console.log(data.data.Recipe[i].Title)
//                 }
//                 //console.log(data.data.Recipe)
            
//             })

//     })




