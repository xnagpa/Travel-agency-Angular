angular.module('thSample').controller('ToursController', function($scope, $routeParams){
$scope.tours = allTours;
$scope.countries = allCountries;

$scope.filterTours = function(){
    //
  };
});