'use strict';

angular.module('myApp')

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.task_new', {
        url: 'task/new',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    })

    .state('app.task_edit', {
        url: '/task/id/:taskid',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    });

}])

.controller('TaskCtrl', ['$scope', '$stateParams', 'TaskServe', '$state', '$window', function($scope, $stateParams, TaskServe, $state, $window) {
    console.log('now in TaskCtrl...');

    $scope.showLog = false;
    $scope.showComment = false;

    //查询条件
    if (!$scope.taskQuery) {
        $scope.taskQuery = {
            id: '',
            name: 'xxx',
            projectCode: 'OIC',
            status: 'QA',
            user: 'Mark'
        }
    }

    if ($stateParams.taskid) {
        //get task by id
        TaskServe.get({ session_id: $rootScope.session.session_id, task_id: $stateParams.taskid }, function(resp) {
            if (resp.code == '50000') {
                // $scope.task = resp.data;
                $scope.task = [{
                    id: 'xxxxxxx',
                    projectCode: 'xxxxxxx',
                    user: 'xxxxxxx',
                    title: 'xxxxxxx',
                    status: 'xxxxxxx',
                    entry_date: 'xxxxxxx'
                }];
            } else {
                console.log(resp.msg);
            }
        });
    } else {
        //get all task by default search task query
        TaskServe.query({}, function(resp) {
            if (resp.code == '50000') {
                // $scope.searched_tasks = resp.data;
                $scope.searched_tasks = [{
                    id: 'xxxxxxx',
                    projectCode: 'xxxxxxx',
                    user: 'xxxxxxx',
                    title: 'xxxxxxx',
                    status: 'xxxxxxx',
                    entry_date: 'xxxxxxx'
                }];
            } else {
                console.log(resp.msg);
            }

        });
    }

    // //tabs
    // $scope.tabs = [
    //     { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    //     { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    // ];

    // $scope.model = {
    //     name: 'Tabs'
    // };
    // //end test

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

    $scope.saveTask = function() {
        console.log('save task.0..');
    };

    // 搜索的结果
    $scope.searched_tasks = [{
        id: '123',
        projectCode: '123',
        user: '123',
        title: '123',
        status: '123',
        entry_date: '123'
    }];

    $scope.searchTask = function() {
        $scope.searched_tasks = [{
            id: 'xxxxxxx',
            projectCode: 'xxxxxxx',
            user: 'xxxxxxx',
            title: 'xxxxxxx',
            status: 'xxxxxxx',
            entry_date: 'xxxxxxx'
        }];
    };

}]);
