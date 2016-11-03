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

.controller('TaskCtrl', ['$scope', '$rootScope', '$filter', '$state', '$stateParams', '$log', 'TaskServe', 'MyTaskServe', 'ProjectServe', 'UserServe', 'LogServe', function($scope, $rootScope, $filter, $state, $stateParams, $log, TaskServe, MyTaskServe, ProjectServe, UserServe, LogServe) {
    console.log('now in TaskCtrl...');

    console.log($state.is('app.task_detail'));
    console.log($state.current.name);

    //pagnination
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.assignTypes = [{ code: "all", name: "所有" }, { code: "Dev", name: "开发" }, { code: "QA", name: "测试" }];

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
    if (!$scope.proUserTeam) {
        ProjectServe.query(function(resp) {
            console.log('所有的项目');
            console.log(resp);
            if (resp.code == '50000') {
                $scope.proUserTeam = resp.data;
                console.log($scope.proUserTeam);

                //preset the project id
                if (!$scope.task) $scope.task = {};
                if ($stateParams.project_id || $scope.task.project_id) {
                    console.log('$stateParams.project_id: ', $stateParams.project_id);
                    console.log('$scope.task.project_id: ', $scope.task.project_id);
                    $scope.task.project = $filter('filter')($scope.proUserTeam, function(value) {
                        return value.project.id == ($stateParams.project_id || $scope.task.project_id);
                    })[0];
                }
            } else {
                console.log(resp.msg);
            }
        })
    }

    if ($stateParams.taskid) {
        //get task by id
        console.log('item 编辑/详情：' + $stateParams.taskid);
        TaskServe.get({ session_id: $rootScope.session.session_id, id: $stateParams.taskid }, function(resp) {
            console.log('获取item详情.');
            console.log(resp);
            if (resp.code == '50000') {
                $scope.task = resp.data;
                if ($scope.proUserTeam)
                    $scope.task.project = $filter('filter')($scope.proUserTeam, function(value) {
                        return value.project.id == $scope.task.project_id;
                    })[0];

                //task获取完成之后再获取log信息
                if ($state.is('app.task_detail')) {
                    console.log('日志列表');
                    $scope.getLogList();
                }
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
                $scope.totalItems = $scope.searched_tasks.length;
                $scope.currentPage = 1;
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
            $scope.task.project_id = parseInt($scope.task.project.project.id);
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
        console.log($scope.search);
        if ($scope.search) {
            if ($scope.search.selectedProject) {
                $scope.search.project_id = $scope.search.selectedProject.project.id;
            }
        }
        MyTaskServe.query($scope.search, function(resp) {
            console.log('任务搜索结果');
            console.log(resp);
            if (resp.code == '50000') {
                $scope.searched_tasks = resp.data;
                $scope.totalItems = $scope.searched_tasks.length;
                $scope.currentPage = 1;
            } else {
                $scope.searched_tasks = [];
            }
        });
    };

    //日志部分
    $scope.getLogList = function() {
        LogServe.query({ item_id: $scope.task.id }, function(resp) {
            console.log('日志列表：');
            console.log(resp);
            console.log(resp.msg);
            if (resp.code == '50000') {
                $scope.workLogList = resp.data;
            }
        });
    };

    $scope.showLog = false;
    //详情页获取日志列表
    if ($state.is('app.task_detail')) {
        //获取logType 列表 
        // TODO 需要接口
        $scope.logTypes = [{ code: 'B', name: 'Billable' }, { code: 'NB', name: 'Nonbillable' }];
    }

    //for test save log
    $scope.workLog = {
        work_date: $filter('date')(new Date(), 'yyyy/MM/dd'),
        minutes: '120',
        item_work_type_code: 'B',
        detail: 'Did Nothing...'
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
        console.log('添加/编辑日志');
        $scope.showLog = 1;
    }
    $scope.cancelLog = function(reset) {
        console.log('取消添加/编辑日志');
        if (reset) {
            $scope.showLog = 0;
        }
        $scope.workLog.detail = '';
        $scope.workLog.minutes = '';
        $scope.workLog.item_work_type_code = '';
        delete $scope.workLog.id;
    }

    $scope.editLog = function(logid) {
        LogServe.get({ session_id: $rootScope.session.session_id, id: logid }, function(resp) {
            console.log('编辑日志');
            console.log(resp);
            if (resp.code == '50000') {
                console.log(resp.msg);
                $scope.workLog = resp.data;
                $scope.addLog();
            } else {
                console.log(resp.msg);
            }
        });
    }

    $scope.saveLog = function() {
        console.log('保存日志');
        $scope.workLog.item_id = $scope.task.id;
        console.log($scope.workLog);
        var logServe = new LogServe($scope.workLog);
        logServe.$save({ session_id: $rootScope.session.session_id }, function(resp) {
            // body... 
            console.log(resp);
            if (resp.code == '50000') {
                $scope.cancelLog($scope.workLog.id);
                $scope.getLogList();
            }
        });
    }
    $scope.delLog = function(logid) {
        console.log('TODO 删除日志, 无接口');
        return;

        LogServe.remove({ task_id: 1, log_id: logid }, function(resp) {
            console.log(resp);
            if (resp.code == '50000') {
                console.log(resp.msg);
                $scope.getLogList();
            } else {
                console.log(resp.msg);
            }
        });
    }
}]);
