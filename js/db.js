RecipeMixerModule.factory ("db", function($http, $rootScope){

  var db = {};
  db.data = {
    Recipe: [],
    Healthiness: {}
  }

  // load JSON data

  $http.get('js/db.json').success(function(loadedData) {
    // you can do some processing here
    var calculateHealthiness = function(Ingredients){
      var healthiness = 0;
      Ingredients.map(function(ingredient){
        if (loadedData.Healthiness[ingredient.name]){
          healthiness = healthiness + (loadedData.Healthiness[ingredient.name] * ingredient.num) ;
        }
      })
      return healthiness;
    }

    for (var i = 0; i < loadedData.Recipe.length; i++) {

      var recipe = loadedData.Recipe[i];

      recipe.img = 'img/' + recipe.Title.toLowerCase().replace(/ /g, '') + '.jpg';
      recipe.Healthiness = calculateHealthiness(recipe.Ingredients)

    }

    db.data = loadedData;

    $rootScope.$broadcast('data_loaded');
  });

  return db;
});


