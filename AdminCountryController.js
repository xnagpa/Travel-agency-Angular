angular.module('thSample').controller('AdminCountryController', function($scope, $routeParams){
  $scope.countries = allCountries;
  $scope.newCountry=  {
      title: null,
      edit_mode:false,
    };

  $scope.changeEditMode = function(country){
    country.edit_mode = !country.edit_mode
  };

  $scope.removeItem = function(index){
    $scope.countries.splice(index, 1);
  };

});