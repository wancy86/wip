'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('app.team_new', {
            url: 'team/new',
            templateUrl: 'components/team/team.html',
            controller: 'TeamCtrl'
        })

    .state('app.team_edit', {
        url: 'team/id/:teamid',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
    });
}])

.controller('TeamCtrl', ['TeamServe', 'TeamMemberServe', 'UserServe', '$stateParams', '$scope', '$http', '$rootScope', '$uibModal', '$log', '$filter', '$state', 'alertMsgServe',
    function(TeamServe, TeamMemberServe, UserServe, $stateParams, $scope, $http, $rootScope, $uibModal, $log, $filter, $state, alertMsgServe) {
        $scope.updateTeamUserList = function() {
            TeamServe.query(function(resp) {
                if (resp.code == '50000') {
                    $scope.teamlist = resp.data.teams;
                    $scope.userlist = resp.data.users;
                    $scope.projectList = resp.data.projects;
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        };

        if (!$state.is('app.team_edit') && $scope.team) {
            delete $scope.team.teamid;
        }
        //显示列表
        if (!$stateParams.teamid) {
            $scope.updateTeamUserList();
        } else {
            // 单个编辑
            TeamServe.get({ session_id: $rootScope.session.session_id, team_id: $stateParams.teamid }, function(resp) {
                if (resp.code == '50000') {
                    $scope.team = resp.data.teams[0];
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        }

        //添加/编辑团队
        $scope.saveTeam = function() {
            if ($scope.newteamForm.$valid) {
                var teamResource = new TeamServe($scope.team);
                teamResource.$save({ session_id: $rootScope.session.session_id }).then(function(resp) {
                    if (resp.code == '50000') {
                        $state.go('app.team');
                    } else {
                        alertMsgServe.alert(resp.msg);
                    }
                })
            }
        };

        //删除团队
        $scope.deleteTeam = function(team_id) {
            var teamResource = new TeamServe($scope.team);
            teamResource.$remove({ session_id: $rootScope.session.session_id, id: team_id }).then(function(resp) {
                if (resp.code == '50000') {
                    //本地数据移除删除掉的team
                    $scope.teamlist = $filter('filter')($scope.teamlist, { id: '!' + team_id });
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        };

        //添加成员dialog代码
        var $ctrl = this;
        $ctrl.openAddMember = function(teamid) {
            $scope.selected_teamid = teamid;
            $scope.addmodalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/team/addMember.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                scope: $scope,
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            $scope.closeAddMemberDialog = function() {
                $scope.addmodalInstance.dismiss();
            }

        };

        $ctrl.openRemoveMember = function(teamid) {
            $scope.selected_teamid = teamid;
            $scope.teamMembers = $filter('filter')($scope.userlist, { team: teamid });

            $scope.delmodalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/team/removeMember.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                scope: $scope,
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            $scope.closeRemoveMemberDialog = function() {
                $scope.delmodalInstance.dismiss();
            }
        };

        // test
        // $scope.mobile_email = '13028865078';

        $scope.searchUser = function(mobile_email) {
            $scope.addMenberInvalid = 0;
            UserServe.query({ mobile_or_email: mobile_email }, function(resp) {
                if (resp.code == '50000') {
                    $scope.searchUsers = resp.data;
                    angular.forEach($scope.searchUsers, function(user, key) {
                        user.team_role_type_code = 'N'; /*设置默认值*/
                    });

                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        };

        //check user on screen
        $scope.selectUser = function(type, selectedUsers) {
            var selectedUsers;
            if (type == 'add')
                selectedUsers = selectedUsers || $filter('filter')($scope.searchUsers, { selected: true });
            else if (type == 'del')
                selectedUsers = selectedUsers || $filter('filter')($scope.teamMembers, { selected: true });

            if (selectedUsers.length == 0) {
                $scope.addMenberInvalid = 1;
            } else {
                $scope.addMenberInvalid = 0;
            }
            return $scope.addMenberInvalid;
        };

        $scope.postAddMembers = function() {
            var selectedUsers = $filter('filter')($scope.searchUsers, { selected: true });
            if ($scope.selectUser('add', selectedUsers)) {
                return false;
            }

            //TODO 后端支持后可以一次提交多个
            angular.forEach(selectedUsers, function(user, key) {
                var params = {
                    session_id: $rootScope.session.session_id,
                    team_id: $scope.selected_teamid,
                    user_id: '',
                    team_role_type_code: 'N' /*T M N*/
                }
                params.user_id = user.id;
                params.team_role_type_code = user.team_role_type_code;
                TeamMemberServe.save(params, function(resp) {
                    if (resp.code == '50000') {
                        $scope.updateTeamUserList();

                    } else {
                        alertMsgServe.alert(resp.msg);
                    }
                });
            });
            $scope.searchUsers = [];
            $scope.closeAddMemberDialog();
        };

        $scope.postRemoveMembers = function() {
            var selectedUsers = $filter('filter')($scope.teamMembers, { selected: true });
            if ($scope.selectUser('del', selectedUsers)) {
                return false;
            }

            var params = {
                session_id: $rootScope.session.session_id,
                team_id: $scope.selected_teamid,
                user_id: ''
            }

            //TODO 后端支持后可以一次提交多个
            angular.forEach(selectedUsers, function(user, key) {
                params.user_id = user.id;
                TeamMemberServe.delete(params, function(resp) {
                    if (resp.code == '50000') {

                        $scope.updateTeamUserList();
                    } else {
                        alertMsgServe.alert(resp.msg);
                    }
                });
            });
            $scope.teamMembers = [];
            $scope.closeRemoveMemberDialog();
        };
    }
])

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', ['$uibModalInstance', function($uibModalInstance) {
    var $ctrl = this;
}])
