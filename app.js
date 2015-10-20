var app = angular.module('thSample',['ngRoute']).
config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:"list.html",
    controller:"MountsController"
  })
});
