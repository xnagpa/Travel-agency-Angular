angular.module('thSample').controller('AdminCountryController', function($scope, $routeParams){
  $scope.countries = allCountries;
  $scope.newCountry=  {
      title: null,
      editMode:false,
    };

  $scope.changeEditMode = function(country){
    country.editMode = !country.editMode
  };

  $scope.removeItem = function(index){
    $scope.countries.splice(index, 1);
  };

});