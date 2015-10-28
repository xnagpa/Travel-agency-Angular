angular.module('thSample').controller('TourController', function($scope, $routeParams, $resource){
  console.log($routeParams.id);
  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
     {objectId: '@objectId'});
  $scope.tour = Tour.get({objectId: $routeParams.id});
});