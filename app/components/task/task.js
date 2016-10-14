'use strict';

angular.module('myApp')

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.task_new', {
        url: 'task/new/:project_id',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    })

    .state('app.task_edit', {
        url: 'task/id/:taskid',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    })

    .state('app.task_detail', {
        url: 'task/id/:taskid/log',
        templateUrl: 'components/task/tasklog.html',
        controller: 'TaskCtrl'
    });

}])

.controller('TaskCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'TaskServe', 'MyTaskServe', 'ProjectServe', 'UserServe', 'LogServe', function($scope, $rootScope, $state, $stateParams, TaskServe, MyTaskServe, ProjectServe, UserServe, LogServe) {
    console.log('now in TaskCtrl...');

    if ($stateParams.project_id) {
        console.log('$stateParams.project_id: ' + $stateParams.project_id);
        $scope.task = {};
        $scope.task.project_id = $stateParams.project_id;
    }

    //All user
    if (!$scope.taskUserList) {
        //TODO 需要正确的用户列表接口
        UserServe.query({ mobile_or_email: '%' }, function(resp) {
            console.log('all user:');
            console.log(resp.data);
            $scope.taskUserList = resp.data;
        });
    }

    //All Project
    if (!$scope.projectList) {
        ProjectServe.query(function(resp) {
            console.log('所有的项目');
            console.log(resp);
            if (resp.code == '50000') {
                $scope.projectList = resp.data;
                console.log($scope.projectList);
                $scope.team = resp.data.team;
            } else {
                console.log(resp.msg);
            }
        })
    }

    if ($stateParams.taskid) {
        //get task by id
        console.log('item 编辑/详情：');
        console.log($stateParams.taskid);
        TaskServe.get({ session_id: $rootScope.session.session_id, task_id: $stateParams.taskid }, function(resp) {
            if (resp.code == '50000') {
                console.log(resp);
                $scope.task = resp.data;
            } else {
                console.log(resp.msg);
            }
        });
    } else {
        //get all task by default search task query
        //默认显示所有的item
        MyTaskServe.query(function(resp) {
            if (resp.code == '50000') {
                console.log(resp);
                $scope.searched_tasks = resp.data;
            } else {
                console.log(resp.msg);
            }

        });
    }

    $scope.saveTask = function() {
        console.log('save task.0..');
        if ($scope.newTaskForm.$valid) {
            console.log('$scope.task:');
            console.log($scope.task);
            $scope.task.project_id = parseInt($scope.task.project_id);
            $scope.task.estimated_time = parseInt($scope.task.estimated_time);

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

    $scope.searchTask = function() {
        console.log($scope.condition);
        $scope.condition.project_id=$scope.condition.selectedProject.id;
        MyTaskServe.query($scope.condition, function(resp) {
            console.log('任务搜索结果');
            console.log(resp);
            if (resp.code == '50000') {
                $scope.searched_tasks = resp.data;
            }
            else{
                $scope.searched_tasks = [];
            }
        });
    };

    //日志部分    
    console.log('$state.$current---------------------');
    console.log($state.is('app.task_detail'));

    $scope.showLog = false;
    if ($state.is('app.task_detail')) {
        //获取log列表
        $scope.logList = [1, 2];
    }
    $scope.log = {
        work_date: '09/27/2016',
        work_time: '09/27/2016',
        log_type: '09/27/2016',
        content: '09/27/2016'
    };


    $scope.tabClick = function(tab) {
        console.log('tab change...');
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
    $scope.addLog = function() {
        console.log('添加日志');
        $scope.showLog = 1;
    }
    $scope.cancelLog = function() {
        console.log('取消添加/编辑日志');
        $scope.showLog = 0;
    }
    $scope.editLog = function(logid) {
        console.log('编辑日志');
        LogServe.get({ task_id: 1, log_id: 1 }, function(resp) {
            console.log(resp);
            if (resp.code == '50000') {
                console.log(resp.msg);
                $scope.log = resp.data;
                $scope.addLog();
            } else {
                console.log(resp.msg);
            }
        });
    }

    $scope.delLog = function(logid) {
        console.log('删除日志');
        // LogServe.remove({ task_id: 1, log_id: 1 }, function(resp) {
        //     console.log(resp);
        //     if (resp.code == '50000') {
        //         console.log(resp.msg);
        // $scope.log = {
        //     work_date: '09/27/2016',
        //     work_time: '09/27/2016',
        //     log_type: '09/27/2016',
        //     content: '09/27/2016'
        // };
        //     } else {
        //         console.log(resp.msg);
        //     }
        // });
    }
    $scope.saveLog = function(logid) {
        console.log('保存日志');
    }


}]);
