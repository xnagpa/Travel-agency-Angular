angular.module('thSample').controller('AdminToursController', function($scope){
  $scope.form_hidden = true;
  $scope.selectedValue = null;
  $scope.newTour =  {
      title: null,
      editMode:true,
      country: null,
      text: null,
      price: null

    };
  $scope.countries = allCountries;
  $http({
    method: 'GET',
    url: 'https://api.parse.com/1/classes/Tour'
  }).then(
    function(response){
      console.log(response);
      $scope.tours = response.data.results;
    }
  );


  $scope.addTour = function(){
    $scope.tours.push(angular.copy($scope.newTour));
  };

  $scope.toggleForm = function(){
    $scope.form_hidden = !$scope.form_hidden
  };

  $scope.changeEditMode = function(tour){
    tour.editMode = !tour.editMode
  };

   $scope.removeItem = function(index){
    $scope.tours.splice(index, 1);
  }

});