'use strict';
angular.module('eliteApp').controller('StandingsCtrl', ['$scope', 'eliteApi', function($scope, eliteApi) {
  eliteApi.getLeagueData().then(function(data){
    $scope.standings = data.standings;
  });
}]);
