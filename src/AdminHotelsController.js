angular.module('thSample').controller('AdminHotelsController', function($scope, $resource){
  $scope.newHotel= {
    editMode: true
  };

  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  var Hotel = $resource('https://api.parse.com/1/classes/Hotel/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );
  $scope.hotels = Hotel.query();

  $scope.addHotel = function(){
    var hotelToServer = new Hotel($scope.newHotel);
    hotelToServer.$save().then(
      function(tour){
        var hotelFromServer = angular.extend(tour,$scope.newHotel);
        $scope.hotels.push(hotelFromServer);
        $scope.newHotel = {};
      });
  };

  $scope.changeEditMode = function(hotel){
    hotel.editMode = !hotel.editMode
  };

  $scope.editHotel = function(index){
    $scope.changeEditMode($scope.hotels[index]);
    Hotel.update($scope.hotels[index]);
  };

  $scope.removeHotel = function(index){
    Hotel.delete({objectId: $scope.hotels[index].objectId}).then(function(){
    $scope.hotels.splice(index, 1);
    });
  };
});