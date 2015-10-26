angular.module('thSample').controller('MountsController', function($scope, currentUser){
  console.log(currentUser);
  $scope.form_hidden = true;
  $scope.tours = allTours;
  $scope.newTour =  {
      title: null,
      edit_mode:false,
      country: null,
      text: null,
      price: null

    };

  $scope.addTour = function(){
    $scope.tours.push(angular.copy($scope.newTour));
  };

  $scope.toggleForm = function(){
    if( $scope.form_hidden == true)
    {
      $scope.form_hidden= false;
      return;
    }
    if( $scope.form_hidden == false)
    {
      $scope.form_hidden= true;
      return;
    }
  };

  $scope.changeEditMode = function(tour){
     if( tour.edit_mode == false )
    {
      tour.edit_mode= true;
      return;
    }
    if( tour.edit_mode == true)
    {
      tour.edit_mode= false;
      return;
    }
  };

   $scope.removeItem = function(index){
    $scope.tours.splice(index, 1);
  }

});