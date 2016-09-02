'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

        .state('app.team_new', {
        url: '/team/new',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
    })

    .state('app.team_edit', {
        url: '/team/teamid/:teamid',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
    });
}])

.controller('TeamCtrl', ['TeamServe', '$stateParams', '$scope', '$http', function(TeamServe, $stateParams, $scope, $http) {
    console.log('now in TeamCtrl...');
    // if (!$stateParams.teamid) {
    //     $http({
    //         method: 'GET',
    //         url: 'data/team/teams.json'
    //     }).then(function(resp) {
    //         $scope.teamlist = resp.data;
    //         console.log(resp.data);
    //     });
    // } else {
    //     $scope.team = TeamServe.get({ teamid: $stateParams.teamid }, function(data) {
    //         console.log(data);
    //     });
    // }
    $scope.team = {
        id: 123,
        name: 'my team',
        teamCode: 'MAX',
        description: 'xxxxxxxxxxxxxxxxx'
    };
    
    $scope.teamlist = [{
        id: 123,
        name: 'my team',
        teamCode: 'MAX',
        description: 'xxxxxxxxxxxxxxxxx'
    }, {
        id: 123,
        name: 'my team',
        teamCode: 'MAX',
        description: 'xxxxxxxxxxxxxxxxx'
    }];


}]);
