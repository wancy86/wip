'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

    // .state('project', {
    //     url: '/project',
    //     templateUrl: 'components/project/projectlist.html',
    //     controller: 'ProjectCtrl'
    // })

    .state('project.new', {
        url: '/project/new',
        templateUrl: 'components/project/project.html',
        controller: 'ProjectCtrl'
    })

    .state('project.edit', {
        url: '/project/projectid/:projectid',
        templateUrl: 'components/project/project.html',
        controller: 'ProjectCtrl'
    });
}])

.controller('ProjectCtrl', ['ProjectServe', '$stateParams', '$scope', '$http', function(ProjectServe, $stateParams, $scope, $http) {
    console.log('now in ProjectCtrl...');
    if (!$stateParams.projectid) {
        console.log('123');
        $http({
            method: 'GET',
            url: 'data/project/projects.json'
        }).then(function(resp) {
            $scope.projectlist = resp.data;
            console.log(resp.data);
        });
    } else {
        $scope.project = ProjectServe.get({ projectid: $stateParams.projectid }, function(data) {
            console.log(data);
        });

    }
}]);
