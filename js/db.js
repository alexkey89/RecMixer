RecipeMixerModule.factory ("db", function($http, $rootScope){

  var db = {};
  db.data = {
    Recipe: [],
    Healthiness: {}
  }

  // load JSON data

  $http.get('js/db.json').success(function(loadedData) {
    // Processing here
    var calculateHealthiness = function(Ingredients){
      var healthiness = 0;
      Ingredients.map(function(ingredient){
        if (loadedData.Healthiness[ingredient.name]){

          exceptions(ingredient)

          healthiness = healthiness + (loadedData.Healthiness[ingredient.name] * parseInt(ingredient.num));

        }
      })
      return healthiness;
    }

    function exceptions(ingredient){

           if (ingredient.num == null){ 
                ingredient.num = 1
           }

    }

    for (var i = 0; i < loadedData.Recipe.length; i++) {

      var recipe = loadedData.Recipe[i];

      recipe.img = 'img/' + recipe.Title.toLowerCase().replace(/ /g, '') + '.jpg';
      
      recipe.HealthinessAmount = calculateHealthiness(recipe.Ingredients);

      recipe.Healthiness = Math.floor(recipe.HealthinessAmount / recipe.Ingredients.length);

    }

    db.data = loadedData;

    $rootScope.$broadcast('data_loaded');
  });

  return db;
});


