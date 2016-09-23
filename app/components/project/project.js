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

.controller('ProjectCtrl', ['ProjectServe', '$stateParams', '$scope', '$http', '$rootScope', '$filter', '$state',
    function(ProjectServe, $stateParams, $scope, $http, $rootScope, $filter, $state) {
        console.log('now in ProjectCtrl...');

        $scope.updateProjectUserList = function() {
            ProjectServe.query(function(resp) {
                console.log(resp);
                if (resp.code == '50000') {
                    $scope.projectList = resp.data;
                }
            });
        };

        //显示列表
        if (!$stateParams.project_id) {
            console.log('get Project list...');
            $scope.updateProjectUserList();
        } else {
            // 单个编辑
            console.log('edit project...');
            ProjectServe.get({ session_id: $rootScope.session.session_id, id: $stateParams.project_id }, function(resp) {
                console.log(resp);
                $scope.project = resp.data[0].project;
                $scope.project.status_list = resp.data[0].status_list;
                $scope.project.team_id = resp.data[0].team.id.toString();
                console.log($scope.project);
            });
        }

        //添加/编辑项目
        $scope.saveProject = function() {
            console.log('post new Project');
            if ($scope.newProjectForm.$valid) {
                console.log('save...');
                // todo
                $scope.project.team_id = '1';
                // $scope.project.status_list = [{
                //     name: 'aaa',
                //     sequence_order: '1'
                // }];
                angular.forEach($scope.project.status_list, function(value, key) {
                    value.sequence_order = key + 1;
                });

                var ProjectResource = new ProjectServe($scope.project);
                console.log(ProjectResource);
                ProjectResource.$save({ session_id: $rootScope.session.session_id }, function(resp) {
                    console.log(resp);
                    if (resp.code == '50000') {
                        console.log('添加/编辑项目成功');
                        $state.go('app.project');
                    } else {
                        console.log(resp.msg);
                    }
                })
            }
        };

        //删除项目
        $scope.deleteProject = function(Project_id) {
            console.log('删除项目...');
            var ProjectResource = new ProjectServe($scope.project);
            ProjectResource.$remove({ session_id: $rootScope.session.session_id, id: Project_id }, function(resp) {
                console.log(resp);
                console.log('删除成功');

                //本地数据移除删除掉的Project
                console.log($scope.projectList);
                $scope.projectList = $filter('filter')($scope.projectList, function(value, index, array) {
                    // console.log(value, index);
                    return value.project.id != Project_id;
                });
            });
        };

        $scope.project = $scope.project || {};
        $scope.project.status_list = $scope.project.status_list || [];
        $scope.addTaskStatus = function() {
            console.log('add status...');

            $scope.project.status_list.push({ name: '' });
        };
        $scope.delTaskStatus = function(index) {
            console.log('del status...');
            $scope.project.status_list = $filter('filter')($scope.project.status_list, { name: '!' + $scope.project.status_list[index].name });
            console.log($scope.project.status_list);
        };


        // end control
    }
])
