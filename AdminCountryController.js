angular.module('thSample').controller('AdminCountryController', function($scope, $resource){

  $scope.newCountry= {
    editMode: true
  };

  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );
  $scope.countries = Country.query();

  $scope.addCountry = function(){
    var countryToServer = new Country($scope.newCountry);
    countryToServer.$save().then(
      function(tour){
        var countryFromServer = angular.extend(tour,$scope.newCountry);
        $scope.countries.push(countryFromServer);
        $scope.newCountry = {};
      });
  };

  $scope.changeEditMode = function(country){
    country.editMode = !country.editMode
  };

  $scope.editCountry = function(index){
    $scope.changeEditMode($scope.countries[index]);
    Country.update($scope.countries[index]);
  };

  $scope.removeCountry = function(index){
    Country.delete({objectId: $scope.countries[index].objectId});
    $scope.countries.splice(index, 1);
  };

});