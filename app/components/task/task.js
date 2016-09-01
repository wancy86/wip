'use strict';

angular.module('myApp')

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $stateProvider.state('task_new', {
        url: 'task/new',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    })

    .state('task_edit', {
        url: '/task/taskid/:taskid',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    });

}])

.controller('TaskCtrl', ['$scope', '$stateParams', 'TaskServe', '$state', '$window', function($scope, $stateParams, TaskServe, $state, $window) {
    console.log('now in TaskCtrl...');
    console.log($stateParams);
    console.log($stateParams.taskid);

    $scope.showLog = false;
    $scope.showComment = false;

    // window.stateProvider=$stateProvider;
    // console.log($state);
    // $state.go('task_edit.newlog', { taskid: 1 });


    $scope.task = TaskServe.get({ taskid: $stateParams.taskid }, function(data) {
        console.log(data);
    });

    //tabs
    $scope.tabs = [
        { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
        { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    $scope.model = {
        name: 'Tabs'
    };
    //end test

    $scope.tabClick = function(tab) {
        // console.log(tab);
        // console.log($state.current.name);

        // console.log($scope.showLog);

        switch (tab) {
            case 'comment':
                $scope.showLog = false;
                // console.log('showLog:');
                // console.log($scope.showLog);
                break;
            case 'log':
                $scope.showComment = false;
                // console.log('showComment:');
                // console.log($scope.showComment);
                break;
            case 'attachment':
                $scope.showLog = false;
                $scope.showComment = false;
                break;
        }
    };

    $scope.newSubItem = function(item) {
        // console.log(item);
        switch (item) {
            case 'comment':
                $scope.showComment = true;
                break;
            case 'log':
                $scope.showLog = true;
                break;
            case 'attachment':
                $scope.showLog = false;
                $scope.showComment = false;
                break;
        }
    };

}]);
