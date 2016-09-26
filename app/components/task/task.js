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

.controller('TaskCtrl', ['$scope', '$rootScope', '$stateParams', 'TaskServe', 'MyTaskServe', 'ProjectServe', 'UserServe', '$state', '$window', function($scope, $rootScope, $stateParams, TaskServe, MyTaskServe, ProjectServe, UserServe, $state, $window) {
    console.log('now in TaskCtrl...');

    $scope.showLog = false;
    $scope.showComment = false;

    //All user
    if (!$scope.taskUserList) {
        //for Test
        $scope.taskUserList = [
            { name: 'Mark Wan', id: '3bf8752d-a498-47d6-b61a-060ca7ed6b44' },
            { name: 'Carrie Ling', id: 'e46e175f-5946-4fe3-a933-c0ebecec20bc' }
        ];

        // if (0) {
        //     UserServe.query({
        //             team_id: 123,
        //             task_id: 123
        //         },
        //         function(resp) {
        //             console.log('taskUserList...');
        //             console.log(resp);
        //             if (resp.code == '50000') {
        //                 $scope.taskUserList = resp.data;
        //             } else {
        //                 console.log(resp.msg);
        //             }
        //         })
        // }
    }

    //All Project
    if (!$scope.projectList) {
        ProjectServe.query({}, function(resp) {
            console.log(resp);
            if (resp.code == '50000') {
                $scope.projectList = resp.data;
                console.log('------------------------');

                $scope.team = resp.data.team;
            } else {
                console.log(resp.msg);
            }
        })
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
        MyTaskServe.query({}, function(resp) {
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
            $scope.task.project_id = parseInt($scope.task.project_id);
            $scope.task.estimated_time = parseInt($scope.task.estimated_time);
            $scope.task.developer_id = 'ba37aff9-e2a3-4c80-b7ae-efd81845cfa1';
            $scope.task.tester_id = 'ba37aff9-e2a3-4c80-b7ae-efd81845cfa1';

            var taskServer = new TaskServe($scope.task);
            taskServer.$save({ session_id: $rootScope.session.session_id }, function(resp) {
                console.log(resp);
                if (resp.code == '50000') {
                    console.log(resp.msg);
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

    //查询条件
    if (!$scope.condition) {
        $scope.condition = {
            conditon_item_id: '1',
            conditon_item_name: '1',
            conditon_project_id: '1',
            conditon_status_id: '1',
            conditon_user_id: '1'
        };
    }

    $scope.searchTask = function() {
        MyTaskServe.query($scope.condition, function(resp) {
            console.log(resp);
            if (resp.code == '50000') {
                $scope.searched_tasks = resp.data;
                $scope.searched_tasks = [{
                    id: 'xxxxxxx',
                    projectCode: 'xxxxxxx',
                    user: 'xxxxxxx',
                    title: 'xxxxxxx',
                    status: 'xxxxxxx',
                    entry_date: 'xxxxxxx'
                }];
            }

        });


    };

}]);
