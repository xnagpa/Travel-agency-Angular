angular.module('thSample').controller('TourController', function($scope, $routeParams, $http){
  console.log($routeParams.id);
  $http({
    method: 'GET',
    url: 'https://api.parse.com/1/classes/Tour/' + $routeParams.id
  }).then(
    function(response){
      console.log(response);
      $scope.tour = response.data;
    }
  );

});