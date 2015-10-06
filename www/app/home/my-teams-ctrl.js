'use strict';
angular.module('eliteApp').controller('MyTeamsCtrl', ['$scope', '$state', 'eliteApi', 'myTeamsService', function($scope, $state, eliteApi, myTeamsService) {
  $scope.myTeams = myTeamsService.getFollowedTeams();

  $scope.goToTeam = function(team){
    eliteApi.setLeagueId(team.leagueId);
    $state.go("app.team-detail", { id: team.id });
  };
}]);
