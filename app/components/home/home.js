'use strict';

angular.module('myApp.home', ['ui.router', 'ui.bootstrap'])

.factory('TasksServe', ['$resource', function($resource) {
    return $resource('data/task/tasks.json', {}, {
        query: {
            method: 'GET',
            // params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])

.controller('HomeCtrl', ['$scope', 'TasksServe','$window', function($scope, TasksServe, $window) {
    $scope.tasklist = TasksServe.query({}, function(data) {
        console.log(data);
    });
}]);

// .config(['$stateProvider', function($stateProvider) {
//     $stateProvider.state('home', {
//         url:'/',
//         templateUrl: 'home/home.html',
//         controller: 'HomeCtrl'
//     });
// }]);
