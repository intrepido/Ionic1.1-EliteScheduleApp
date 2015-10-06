'use strict';
angular.module('eliteApp').controller('LocationCtrl', ['$scope', 'eliteApi', function($scope, eliteApi) {
  eliteApi.getLeagueData().then(function(data){
    $scope.locations = data.locations;
  });
}]);
