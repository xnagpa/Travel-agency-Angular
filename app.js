var app = angular.module('thSample',[]);
app.controller('MountsController', function($scope){
  $scope.formHidden = true;
  $scope.tours = [
    {
      title: "Yet another suburban train",
      editMode:false,
      country: "Russia",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 140000
    },
    {
      title: "Adventure time",
      editMode:false,
      country: "USA",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 100000
    }
  ];
  $scope.newTour =  {
      title: null,
      editMode:false,
      country: null,
      text: null,
      price: null

    };

  $scope.addTour = function(){
    $scope.tours.push(angular.copy($scope.newTour));
  };

  $scope.toggleForm = function(){
   $scope.formHidden = !$scope.formHidden
  };

  $scope.changeEditMode = function(tour){
   tour.editMode = !tour.editMode
  };

   $scope.removeItem = function(index){
    $scope.tours.splice(index, 1);
  }

});
