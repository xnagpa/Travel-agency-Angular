var app = angular.module('thSample',['ngRoute','ngResource']).
config(function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider.when('/edit-tours',{
    templateUrl:"edit-tours.html",
    controller:"AdminToursController",
    publicAccess: true,
    resolve: {
      currentUser: function(){
        return {name: 'Admin'};
      }
    }
  })
  .when('/tour/:id',{
    templateUrl:"tour.html",
    controller:"TourController",
    publicAccess: true
  })
  .when('/edit-countries',{
    templateUrl:"edit-countries.html",
    controller:"AdminCountryController",
    publicAccess: true
  })
  .when('/',{
    templateUrl:"tours.html",
    controller:"ToursController",
    publicAccess: true
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
  $httpProvider.defaults.headers.common = {
    "X-Parse-Application-Id": "aloL0GB7gZ4raYQiXfDHR6osxiWH0k1ohk2iDc5f",
    "X-Parse-REST-API-Key": "bhs6jSu3Wo9YkLBcbQBxmK84bRTvV0mLJbZt50ik"
  };
}).run(function($rootScope, $route, $location){
  $rootScope.$on("$locationChangeStart", function(event, next, current){
    console.log(event);
    console.log(next);
    console.log(current);

    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath] || $route.routes['/tour/:slug'];
    if (!nextRoute.publicAccess){
      alert('Необходима регистрация.')
      $location.path('/');
    }
  });
});

allCountries = [
  {
    title: "Russia",
    edit_mode:true
  },
  {
    title: "Poland",
    edit_mode:true
  }
];

