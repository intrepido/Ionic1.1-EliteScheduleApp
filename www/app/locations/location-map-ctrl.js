'use strict';
angular.module('eliteApp').controller('LocationMapCtrl', ['$scope', '$stateParams', 'eliteApi', function($scope, $stateParams, eliteApi) {
  $scope.locationId = Number($stateParams.id);

  console.log("ENTRO AL CONTROLADOR");

  $scope.map = {
    center: {
      latitude: 38.897677,
      longitude: -77.036530,
    },
    zoom: 12
  };
  $scope.marker = { }

  eliteApi.getLeagueData().then(function(data){
    $scope.location = _.find(data.locations, { id: $scope.locationId });
    $scope.marker = {
      id: 0,
      coords:{
        latitude: $scope.location.latitude,
        longitude: $scope.location.longitude
      },
      options: {
        title: $scope.location.name,
        //label: {text: $scope.location.name},
        animation: google.maps.Animation.DROP
        //showWindow: true
      }
    };
    $scope.map.center.latitude = $scope.location.latitude;
    $scope.map.center.longitude = $scope.location.longitude;
  });

  $scope.locationClicked = function(marker){
    window.location = "geo:" + marker.latitude + "," + marker.longitude + "?q=410+Hauser+Boulevard,+Los+Angeles,+CA";
  };
}]);

function outter(num1){
  function inner(num2){
    return num1 + num2;
  }
  return inner;
}

outter(2)(3);
