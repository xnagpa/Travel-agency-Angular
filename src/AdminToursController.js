angular.module('thSample').controller('AdminToursController', function($scope, $resource){
  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );

  var Country = $resource('https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults}
    }
  );

  var Hotel = $resource('https://api.parse.com/1/classes/Hotel/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults}
    }
  );

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );

  $scope.form_hidden = true;
  $scope.selectedValue = null;
  $scope.newTour =  {};

  $scope.tours = Tour.query();
  $scope.countries = Country.query();
  $scope.hotels = Hotel.query();
  $scope.places = Place.query();

  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour,$scope.newTour);
        $scope.tours.push(tourFromServer);
        $scope.newTour = {};
      });
  };

  $scope.editTour = function(index){
    $scope.changeEditMode($scope.tours[index]);
    Tour.update($scope.tours[index]);
    $scope.countries = Country.query();
  };

  $scope.toggleForm = function(){
    $scope.form_hidden = !$scope.form_hidden
  };

  $scope.changeEditMode = function(tour){
    tour.editMode = !tour.editMode
  };

  $scope.removeTour = function(index){
    Tour.delete({objectId: $scope.tours[index].objectId}).then(function(){
    $scope.tours.splice(index, 1);
    });
  };

  $scope.findCountryForTour = function(CountryId){
    return _.find($scope.countries, function(country){
      return CountryId === country.objectId
    });
  };

  $scope.findHotelForTour = function(HotelId){
    return _.find($scope.hotels, function(hotel){
      return HotelId === hotel.objectId
    });
  };

});