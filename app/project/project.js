'use strict';

angular.module('myApp.project', ['ngRoute'])

.service('ProjectServe', ['$resource', function($resource) {
    return $resource('data/project/:projectid.json', {}, {
        query: {
            method: 'GET',
            params: {
                projectid: 'projectid'
            },
            isArray: true
        }
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/project', {
        templateUrl: 'project/projectlist.html',
        controller: 'ProjectCtrl'
    })

    .when('/project/new', {
        templateUrl: 'project/project.html',
        controller: 'ProjectCtrl'
    })

    .when('/project/projectid/:projectid', {
        templateUrl: 'project/project.html',
        controller: 'ProjectCtrl'
    });
}])

.controller('ProjectCtrl', ['ProjectServe', '$routeParams', '$scope', '$http', function(ProjectServe, $routeParams, $scope, $http) {
    console.log('now in ProjectCtrl...');
    if (!$routeParams.projectid) {
        console.log('123');
        $http({
            method: 'GET',
            url: 'data/project/projects.json'
        }).then(function(resp) {
            $scope.projectlist = resp.data;
            console.log(resp.data);
        });
    } else {
        $scope.project = ProjectServe.get({ projectid: $routeParams.projectid }, function(data) {
            console.log(data);
        });

    }
}]);
