'use strict';
angular.module('eliteApp').controller('TeamsCtrl', ['$scope','eliteApi', function($scope, eliteApi) {
  $scope.loadList = function(forceRefresh) {
    eliteApi.getLeagueData(forceRefresh).then(function(data) {
      $scope.teams = data.teams;
    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadList(false);
}]);
