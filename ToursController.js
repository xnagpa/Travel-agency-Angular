angular.module('thSample').controller('ToursController', function($scope, $resource){
  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults}
    }
  );

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );

  var Hotel = $resource('https://api.parse.com/1/classes/Hotel/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults}
    }
  );

  $scope.hotels = Hotel.query();
  $scope.places = Place.query();
  $scope.countries = Country.query();
  $scope.tours = Tour.query();


});