'use strict';

angular.module('myApp.home', ['ngRoute'])

.factory('TasksServe', ['$resource', function($resource) {
    return $resource('data/task/tasks.json', {}, {
        query: {
            method: 'GET',
            // params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])

.controller('HomeCtrl', ['$scope', 'TasksServe', function($scope, TasksServe) {
    $scope.tasklist = TasksServe.query({}, function(data) {
        console.log(data);
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}]);
