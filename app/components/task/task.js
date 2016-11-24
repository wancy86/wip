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

.controller('TaskCtrl', ['$scope', '$rootScope', '$filter', '$state', '$stateParams', '$log', 'TaskServe', 'MyTaskServe', 'ProjectServe', 'UserServe', 'LogServe', 'alertMsgServe', function($scope, $rootScope, $filter, $state, $stateParams, $log, TaskServe, MyTaskServe, ProjectServe, UserServe, LogServe, alertMsgServe) {

    $scope.assignTypes = [{ code: "all", name: "所有" }, { code: "Dev", name: "开发" }, { code: "QA", name: "测试" }];

    //$scope.satatus_list=[{code:'',name:'未开始'}，{code:'',name:'进行中'}，{code:'',name:'已完成'}];

    //All user
    if (!$scope.taskUserList) {
        //TODO 需要正确的用户列表接口
        UserServe.query({ mobile_or_email: '%' }, function(resp) {
            if (resp.code == '50000') {
                $scope.taskUserList = resp.data;
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    }

    //All Project
    if (!$scope.proUserTeam) {
        ProjectServe.query(function(resp) {
            if (resp.code == '50000') {
                $scope.proUserTeam = resp.data;

                //preset the project id
                if (!$scope.task) $scope.task = {};
                if ($stateParams.project_id || $scope.task.project_id) {
                    $scope.task.project = $filter('filter')($scope.proUserTeam, function(value) {
                        return value.project.id == ($stateParams.project_id || $scope.task.project_id);
                    })[0];
                    $scope.changeProject();
                }
            } else {
                alertMsgServe.alert(resp.msg);
            }
        })
    }

    //change project need to generate the status array
    $scope.changeProject = function() {
            //console.log('changeProject: ', $scope.task.project)
            if ($scope.task.project) {
                $scope.task.status_table = [];
                angular.forEach($scope.task.project.status_list, function(value, key) {
                    $scope.task.status_table.push({
                        status_id: value.id,
                        status_name: value.name,
                        // sequence_order: value.sequence_order,
                        user_id: ''
                    });
                });
            }
        }
        //pagnination
    if (!$scope.search) $scope.search = {
        totalItems: 0,
        currentPage: 1,
        pageSize: 10
    };

    if ($stateParams.taskid) {
        //get task by id
        TaskServe.get({ session_id: $rootScope.session.session_id, id: $stateParams.taskid }, function(resp) {
            if (resp.code == '50000') {
                $scope.task = resp.data;
                if ($scope.proUserTeam)
                    $scope.task.project = $filter('filter')($scope.proUserTeam, function(value) {
                        return value.project.id == $scope.task.project_id;
                    })[0];

                //task获取完成之后再获取log信息
                if ($state.is('app.task_detail')) {
                    $scope.getLogList();
                }
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    } else {
        //get all task by default search task query
        //默认显示所有的item
        MyTaskServe.query($scope.search,function(resp) {
            if (resp.code == '50000') {
                $scope.searched_tasks = resp.data.records;
                $scope.search.totalItems = resp.data.total;
                $scope.search.currentPage = 1;
                //console.log('XXXX: ',resp.data.total,$scope.search.totalItems)
            } else {
                alertMsgServe.alert(resp.msg);
            }

        });
    }

    $scope.saveTask = function() {
        if ($scope.newTaskForm.$valid) {
            $scope.task.project_id = parseInt($scope.task.project.project.id);
            $scope.task.estimated_time = parseInt($scope.task.estimated_time);

            var taskServer = new TaskServe($scope.task);
            taskServer.$save({ session_id: $rootScope.session.session_id }).then(function(resp) {
                if (resp.code == '50000') {
                    $state.go('app.task');
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        }
    };


    $scope.pageChanged = function() {
        // $log.log('Page changed to: ' + $scope.search.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
        //console.log('total: ',$scope.search.totalItems)
        $scope.searchTask();
    };

    $scope.searchTask = function() {
        //reset
        $scope.searched_tasks = [];

        if ($scope.search) {
            if ($scope.search.selectedProject) {
                $scope.search.project_id = $scope.search.selectedProject.project.id;
            } else {
                delete $scope.search.project_id;
            }
        }
        MyTaskServe.query($scope.search, function(resp) {
            if (resp.code == '50000') {
                $scope.searched_tasks = resp.data.records;
                $scope.search.totalItems = resp.data.total;
                //console.log('XXXX: ',resp.data.total,$scope.search.totalItems);
            } else {
                $scope.searched_tasks = [];
                $scope.search.totalItems = 0;
                $scope.search.currentPage = 1;
                alertMsgServe.alert(resp.msg);
            }
        });
    };

    //日志部分
    $scope.getLogList = function() {
        LogServe.query({ item_id: $stateParams.taskid }, function(resp) {
            if (resp.code == '50000') {
                $scope.workLogList = resp.data;
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    };

    $scope.showLog = false;
    //详情页获取日志列表
    if ($state.is('app.task_detail')) {
        //获取logType 列表 
        // TODO 需要接口
        $scope.logTypes = [{ code: 'BILL', name: 'Billable' }, { code: 'NOBILL', name: 'Nonbillable' }];
    }

    //for test save log
    $scope.workLog = {
        work_date: $filter('date')(new Date(), 'yyyy-MM-dd'),
        minutes: '120',
        item_work_type_code: 'BILL',
        detail: 'Did Nothing...'
    };

    $scope.tabClick = function(tab) {};

    $scope.addLog = function() {
        $scope.showLog = 1;
    }
    $scope.cancelLog = function(reset) {
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
            if (resp.code == '50000') {
                $scope.workLog = resp.data;
                $scope.addLog();
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    }

    $scope.saveLog = function() {
        $scope.workLog.item_id = $stateParams.taskid;
        var logServe = new LogServe($scope.workLog);
        logServe.$save({ session_id: $rootScope.session.session_id }, function(resp) {
            // body... 
            if (resp.code == '50000') {
                $scope.cancelLog($scope.workLog.id);
                $scope.getLogList();
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    }
    $scope.delLog = function(logid) {
        return;

        LogServe.remove({ task_id: 1, log_id: logid }, function(resp) {
            if (resp.code == '50000') {
                $scope.getLogList();
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });
    }
}]);
