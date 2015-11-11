describe('TourController', function(){
  var tourAPIUrl = 'https://api.parse.com/1/classes/Tour';
  var countryAPIUrl = 'https://api.parse.com/1/classes/Country';
  var $scope = {};
  var tour = null;
  var country = null;

  beforeEach(module('thSample'));
  beforeEach(inject(function($controller, _$httpBackend_){
    $controller('TourController',{$scope: $scope });
    $httpBackend = _$httpBackend_;

    tour = { title:"Majestic tour", objectId:"xcxccxss", price: 10000, slug: 2, duration:10, editMode: false, CountryId: "XguwRX1QYD", HotelId: "t6ZInGRllk"};
    country = { objectId: 'XguwRX1QYD', title: 'Latvija' };

    jsonResponse = JSON.stringify(tour);
    jsonCountryResponse = JSON.stringify(country);

    $httpBackend.expectGET(tourAPIUrl).respond(200, jsonResponse);
    $httpBackend.expectGET(countryAPIUrl).respond(200, jsonCountryResponse);
  }));

  describe('controller initialize', function(){
    it('expect query to parse.com', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('sets $scope.tours to array of tours', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      expect($scope.tour).toBeDefined;
      expect($scope.tour.objectId).toEqual(tour.objectId);
    });

    it('sets $scope.countries to array of tours', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      expect($scope.country).toBeDefined;
      expect($scope.country.objectId).toEqual(country.objectId);
    });
  });
});