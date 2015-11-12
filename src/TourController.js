angular.module('thSample').controller('TourController', function($scope, $routeParams, $resource){
  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
     {objectId: '@objectId'});

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'}
  );
  $scope.tour = Tour.get({objectId: $routeParams.id});
  $scope.country = Country.get({objectId: $scope.tour.CountryId})
});