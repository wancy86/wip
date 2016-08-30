'use strict';

angular.module('myApp.task', ['ui.router', 'ngResource'])

.factory('TaskServe', ['$resource', function($resource) {
    return $resource('data/task/:taskid.json', {}, {
        query: {
            method: 'GET',
            params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $stateProvider.state('task_new', {
        url: 'task/new',
        templateUrl: 'task/task.html',
        controller: 'TaskCtrl'
    })

    .state('task_edit', {
        url: '/task/taskid/:taskid',
        templateUrl: 'task/task.html',
        controller: 'TaskCtrl'
    })

    .state('task_edit.newlog', {
        url: '/newlog',
        templateUrl: 'log/log.html',
        controller: 'LogCtrl'
    })

    .state('task_edit.newcomment', {
        url: '/newcomment',
        templateUrl: 'comment/comment.html',
        controller: 'CommentCtrl'
    });
}])

.controller('TaskCtrl', ['$scope', '$stateParams', 'TaskServe', '$state', function($scope, $stateParams, TaskServe, $state) {
    console.log('now in TaskCtrl...');
    console.log($stateParams);
    console.log($stateParams.taskid);

    // window.stateProvider=$stateProvider;
    console.log($state);
    $state.go('task_edit.newlog', { taskid: 1 });


    $scope.task = TaskServe.get({ taskid: $stateParams.taskid }, function(data) {
        console.log(data);
    });

}]);
