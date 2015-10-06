'use strict';
angular.module('eliteApp').controller('LeaguesCtrl', ['$scope', '$state', 'eliteApi', function( $scope, $state, eliteApi) {

  eliteApi.getLeagues().then(function(data){
      $scope.leagues = data;
  });

  $scope.selectLeague = function (id) {
    eliteApi.setLeagueId(id);
    $state.go('app.teams', {"id": "fidel el loco"});
  };

}]);


