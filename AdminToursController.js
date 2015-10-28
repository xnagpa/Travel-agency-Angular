angular.module('thSample').controller('AdminToursController', function($scope, $resource, currentUser){
  console.log(currentUser);
  $scope.form_hidden = true;
  $scope.selectedValue = null;
  $scope.newTour =  {};
  $scope.countries = allCountries;

  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

  var Tour = $resource('https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query:{isArray: true, transformResponse: parseResults}});
  $scope.tours = Tour.query();


  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour,$scope.newTour);
        $scope.tours.push(tourFromServer);
        $scope.newTour = {};
      });
  };

  $scope.toggleForm = function(){
    $scope.form_hidden = !$scope.form_hidden
  };

  $scope.changeEditMode = function(tour){
    tour.edit_mode = !tour.edit_mode
  };

   $scope.removeItem = function(index){
    $scope.tours.splice(index, 1);
  }

});