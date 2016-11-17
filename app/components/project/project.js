'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

        .state('app.project_new', {
        url: 'project/new',
        templateUrl: 'components/project/project.html',
        controller: 'ProjectCtrl'
    })

    .state('app.project_edit', {
        url: 'project/id/:project_id',
        templateUrl: 'components/project/project.html',
        controller: 'ProjectCtrl'
    });
}])

.controller('ProjectCtrl', ['ProjectServe', 'TeamServe', '$stateParams', '$scope', '$http', '$rootScope', '$filter', '$state', 'alertMsgServe',
    function(ProjectServe, TeamServe, $stateParams, $scope, $http, $rootScope, $filter, $state, alertMsgServe) {

        $scope.updateProjectUserList = function() {
            ProjectServe.query(function(resp) {
                if (resp.code == '50000') {
                    $scope.projectList = resp.data;
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        };

        //get team list
        $scope.teamlist = [];
        TeamServe.query(function(resp) {
            if (resp.code == '50000') {
                $scope.teamlist = resp.data.teams;
                $scope.userlist = resp.data.users;
            } else {
                alertMsgServe.alert(resp.msg);
            }
        });

        //显示列表
        if (!$stateParams.project_id) {
            $scope.updateProjectUserList();
        } else {
            // 单个编辑
            ProjectServe.get({ session_id: $rootScope.session.session_id, id: $stateParams.project_id }, function(resp) {
                if (resp.code == '50000') {
                    $scope.project = resp.data[0].project;
                    $scope.project.status_list = resp.data[0].status_list;
                    $scope.project.team_id = resp.data[0].team.id.toString();
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        }

        //添加/编辑项目
        $scope.saveProject = function() {
            if ($scope.newProjectForm.$valid) {
                angular.forEach($scope.project.status_list, function(value, key) {
                    value.sequence_order = key + 1;
                });

                var ProjectResource = new ProjectServe($scope.project);
                ProjectResource.$save({ session_id: $rootScope.session.session_id }, function(resp) {
                    if (resp.code == '50000') {
                        $state.go('app.project');
                    } else {
                        alertMsgServe.alert(resp.msg);
                    }
                })
            }
        };

        //删除项目
        $scope.deleteProject = function(Project_id) {
            var ProjectResource = new ProjectServe($scope.project);
            ProjectResource.$remove({ session_id: $rootScope.session.session_id, id: Project_id }, function(resp) {

                //本地数据移除删除掉的Project
                $scope.projectList = $filter('filter')($scope.projectList, function(value, index, array) {
                    return value.project.id != Project_id;
                });
            });
        };

        $scope.project = $scope.project || {};
        $scope.project.status_list = $scope.project.status_list || [];
        $scope.addTaskStatus = function() {

            $scope.project.status_list.push({ name: '' });
        };
        $scope.delTaskStatus = function(index) {
            $scope.project.status_list = $filter('filter')($scope.project.status_list, { name: '!' + $scope.project.status_list[index].name });
        };


        // end control
    }
])
