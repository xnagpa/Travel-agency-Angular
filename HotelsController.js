angular.module('thSample').controller('HotelsController', function($scope, $resource){
  function parseResults(data, headersGetter)
  {
    data = angular.fromJson(data);
    return data.results;

  }

}