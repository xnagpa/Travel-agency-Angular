angular.module('thSample').controller('AdminPlacesController', function($scope, $resource){
  $scope.newPlace= {
    editMode: true
  };

  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  var Place = $resource('https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {
      query:{isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  );
  $scope.places = Place.query();

  $scope.addPlace = function(){
    var placeToServer = new Place($scope.newPlace);
    placeToServer.$save().then(
      function(tour){
        var placeFromServer = angular.extend(tour,$scope.newPlace);
        $scope.places.push(placeFromServer);
        $scope.newPlace = {};
      });
  };

  $scope.changeEditMode = function(place){
    place.editMode = !place.editMode
  };

  $scope.editPlace = function(index){
    $scope.changeEditMode($scope.places[index]);
    Place.update($scope.places[index]);
  };

  $scope.removePlace = function(index){
    Place.delete({objectId: $scope.places[index].objectId}).then(function(){
    $scope.places.splice(index, 1);
    });
  };
});