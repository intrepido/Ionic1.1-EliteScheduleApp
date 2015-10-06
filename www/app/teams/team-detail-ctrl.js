'use strict';
angular.module('eliteApp').controller('TeamDetailCtrl', ['$scope', '$stateParams', '$ionicPopup', 'eliteApi', 'myTeamsService', function ($scope, $stateParams, $ionicPopup, eliteApi, myTeamsService) {
  //console.log("$stateParams", $stateParams);

  var team = null;
  var leagueData = null;

  $scope.teamId = Number($stateParams.id);

  eliteApi.getLeagueData().then(function(data){

    team = _.chain(data.teams)
      .pluck("divisionTeams")
      .flatten()
      .find({"id": $scope.teamId})
      .value();

    $scope.teamName = team.name;

    $scope.games = _.chain(data.games)
      .filter(isTeamInGame)
      .map(function (item) {
        var isTeam1 = (item.team1Id === $scope.teamId ? true : false);
        var opponentName = isTeam1 ? item.team2 : item.team1;
        var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
        return {
          gameId: item.id,
          opponent: opponentName,
          time: item.time,
          location: item.location,
          locationUrl: item.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

    $scope.teamStanding = _.chain(data.standings)
      .pluck("divisionStandings")
      .flatten()
      .find({"teamId": $scope.teamId})
      .value();

    leagueData = data.league;
  });

  $scope.following = myTeamsService.isFollowingTeam($scope.teamId.toString());

  $scope.toggleFollow = function () {
    if ($scope.following) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unfollow?',
        template: 'Are you sure you want to unfollow?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.following = !$scope.following;
          myTeamsService.unfollowTeam(team.id);
        }
      });
    } else {
        $scope.following = !$scope.following;
        myTeamsService.followTeam({ id: team.id, name: team.name, leagueId: leagueData.id, leagueName: leagueData.name });
    }
  };


  function isTeamInGame(item) {
    return item.team1Id === $scope.teamId || item.team2Id === $scope.teamId;
  }

  function getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

}]);
