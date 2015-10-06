'use strict';
angular.module('eliteApp').controller('GameCtrl', ['$scope', '$stateParams', 'eliteApi', function ($scope, $stateParams, eliteApi) {
  var gameId = Number($stateParams.id);
  eliteApi.getLeagueData().then(function(data){
    $scope.game = _.find(data.games, {"id": gameId});
  });
}]);
