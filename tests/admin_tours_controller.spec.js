describe('AdminToursController', function(){
  beforeEach(module('thSample'));
  var $scope = {};
  var $httpBackend =null;
  var tour = null;

  var tourAPIUrl = 'https://api.parse.com/1/classes/Tour';
  var countryAPIUrl = 'https://api.parse.com/1/classes/Country';
  var hotelAPIUrl = 'https://api.parse.com/1/classes/Hotel';
  var placeAPIUrl = 'https://api.parse.com/1/classes/Place';

  beforeEach(inject(function($controller, _$httpBackend_){
    $controller('AdminToursController',{$scope: $scope });
    $httpBackend = _$httpBackend_;

    tour = { title:"Majestic tour", objectId:"xcxccxss", price: 10000, slug: 2, duration:10, editMode: false, CountryId: "XguwRX1QYD", HotelId: "t6ZInGRllk"};
    country = { objectId: 'XguwRX1QYD', title: 'Latvija' };
    hotel = { objectId: 't6ZInGRllk', title: 'Kempimski plaza' };

    jsonResponse = JSON.stringify({results: [tour]});
    jsonCountryResponse = JSON.stringify({results: [country]});
    jsonHotelResponse = JSON.stringify({results: [hotel]});

    $httpBackend.expectGET(tourAPIUrl).respond(200, jsonResponse);
    $httpBackend.expectGET(countryAPIUrl).respond(200, jsonCountryResponse);
    $httpBackend.expectGET(hotelAPIUrl).respond(200, jsonHotelResponse);
    $httpBackend.expectGET(placeAPIUrl).respond(200);
  }));

  describe('controller initialize', function(){
    it('sets newTour to empty object', function(){
      expect($scope.newTour).toEqual({});
    });

    it('expect query to parse.com', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('sets $scope.tours to array of tours', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      expect($scope.tours.length).toBe(1);
      expect($scope.tours[0].objectId).toEqual(tour.objectId);
    });
  });

  describe('tests $scope.addTour', function(){
    it('performs POST query to parse.com', function(){
       $httpBackend.expectPOST(tourAPIUrl).respond(201);
       $httpBackend.expectGET('tours.html').respond(200);
       $scope.addTour();
       expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('changes mounts count by 1 ', function(){
      $httpBackend.whenPOST(tourAPIUrl).respond(201);
      $httpBackend.expectGET('tours.html').respond(200);
      $scope.addTour();
      $httpBackend.flush();
      expect($scope.tours.length).toBeGreaterThan(0);
    });

    it('expect method push to be called on $scope.tours', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      $httpBackend.whenPOST(tourAPIUrl).respond(201);
      spyOn($scope.tours, 'push');
      $scope.addTour();
      $httpBackend.flush();
      expect($scope.tours.push).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    });
  });

  describe('tests $scope.toggleForm', function(){
    it(' changes to opposite when $scope.toggleForm() called', function(){
      formHiddenFlag = $scope.form_hidden;
      $scope.toggleForm();
      expect($scope.form_hidden).toEqual(!formHiddenFlag);
    });
  });

  describe('tests tour.editMode', function(){
    it(' changes to opposite when changeEditMode(tour) called', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      editModeFlag = $scope.tours[0].editMode;
      $scope.changeEditMode($scope.tours[0]);
      expect($scope.tours[0].editMode).toEqual(!editModeFlag);
    });
  });

  describe('tests $scope.findCountry', function(){
    it('finds country for tour', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      expect($scope.tours[0].CountryId).toEqual($scope.findCountryForTour($scope.tours[0].CountryId).objectId);
    });
  });

  describe('tests $scope.findHotel', function(){
    it('finds hotel for tour', function(){
      $httpBackend.expectGET('tours.html').respond(200);
      $httpBackend.flush();
      expect($scope.tours[0].HotelId).toEqual($scope.findHotelForTour($scope.tours[0].HotelId).objectId);
    });
  });

  describe('tests $scope.removeTour', function(){
    it('performs DELETE query to parse.com', function(){
       $httpBackend.expectGET('tours.html').respond(200);
       $httpBackend.flush();
       $scope.removeTour(0);
       expect($scope.tours.length).toBe(0);
    });
  });

  describe('tests $scope.editTour', function(){
    it('performs UPDATE query to parse.com', function(){
       $httpBackend.expectGET('tours.html').respond(200);
       $httpBackend.flush();
       $scope.tours[0].title = "newTitle";
       $scope.editTour(0);
       $httpBackend.expectPUT(hotelAPIUrl).respond(200);
       expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    });
  });



});