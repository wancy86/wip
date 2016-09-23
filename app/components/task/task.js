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

.controller('TaskCtrl', ['$scope', '$rootScope', '$stateParams', 'TaskServe', '$state', '$window', function($scope, $rootScope, $stateParams, TaskServe, $state, $window) {
    console.log('now in TaskCtrl...');

    $scope.showLog = false;
    $scope.showComment = false;

    //查询条件
    if (!$scope.taskQuery) {
        $scope.taskQuery = {
            id: '',
            name: 'xxx',
            description: 'xxx',
            estimated_time: 'xxx',
            project_id: 'xxx',
            developer_id: 'xxx',
            tester_id: 'xxx'
        };
    }

    if ($stateParams.taskid) {
        //get task by id
        TaskServe.get({ session_id: $rootScope.session.session_id, task_id: $stateParams.taskid }, function(resp) {
            if (resp.code == '50000') {
                console.log(resp);
                $scope.task = resp.data;
                // $scope.task = [{
                //     id: '',
                //     name: 'xxx',
                //     description: 'xxx',
                //     estimated_time: 'xxx',
                //     project_id: 'xxx',
                //     developer_id: 'xxx',
                //     tester_id: 'xxx'
                // }];
            } else {
                console.log(resp.msg);
            }
        });
    } else {
        //get all task by default search task query
        TaskServe.query({}, function(resp) {
            if (resp.code == '50000') {
                console.log(resp);
                $scope.searched_tasks = resp.data;
            } else {
                console.log(resp.msg);
            }

        });
    }

    $scope.tabClick = function(tab) {
        switch (tab) {
            case 'comment':
                $scope.showLog = false;
                break;
            case 'log':
                $scope.showComment = false;
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
        if ($scope.newTaskForm.$valid) {
            var taskServer = new TaskServe(task);
            taskServer.$save({ session_id: $rootScope.session.session_id }, function(resp) {
                console.log(resp);
                if (resp.code == '50000') {
                    console.log(rep.msg);
                    $state.go('app.task');
                } else {
                    alert(resp.msg);
                }
            });
        }
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
