'use strict';

angular.module('myApp.task', ['ngRoute', 'ngResource'])

.factory('TaskServe', ['$resource', function($resource) {
    return $resource('data/task/:taskid.json', {}, {
        query: {
            method: 'GET',
            params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/task/new', {
        templateUrl: 'task/task.html',
        controller: 'TaskCtrl'
    })

    .when('/task/taskid/:taskid', {
        templateUrl: 'task/task.html',
        controller: 'TaskCtrl'
    });
}])

.controller('TaskCtrl', ['$scope', '$routeParams', 'TaskServe', function($scope, $routeParams, TaskServe) {
    console.log('now in TaskCtrl...');
    console.log($routeParams.taskid);
    console.log(TaskServe);
    // window.TaskServe=TaskServe;

    // $scope.task = {
    //     id: $routeParams.taskid,
    //     name: 'xxxx',
    //     projectCode: 'OIC',
    //     status: 'Inprogress',
    //     developer: 'Mark',
    //     codeReviewer: 'Miles'
    // };

    $scope.task = TaskServe.get({ taskid: $routeParams.taskid }, function(data) {
        console.log(data);
    });

}]);
