"use strict";

//routes
var RecipeMixerModule = angular.module("RecipeMixerModule", ['ngRoute', 'mainAppController']);


    RecipeMixerModule.config(function($routeProvider){
    	$routeProvider
    		.when('/view1',{
    			controller: 'ListController',
    			templateUrl: 'Partials/landingPage.html'
    		})
    		.when('/view2',{
    			controller: 'ListController',
    			templateUrl: 'Partials/ListView.html'
    		})
            .when('/view3/:RecId',{
                controller: 'DetailsController',
                templateUrl: 'Partials/detailsView.html'
            })
    		.otherwise({redirectTo: '/view1'})
    	
    });
