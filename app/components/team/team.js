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
            // params: {
            //     teamid: { value: 0 }
            // }
    });
}])

.controller('TeamCtrl', ['TeamServe', '$stateParams', '$scope', '$http', '$rootScope', '$uibModal', '$log', '$filter', '$state',
    function(TeamServe, $stateParams, $scope, $http, $rootScope, $uibModal, $log, $filter, $state) {
        console.log('now in TeamCtrl...');
        //显示列表
        if (!$stateParams.teamid) {
            console.log('get team list...');
            TeamServe.query(function(resp) {
                console.log(resp);
                if (resp.code == '50000') {
                    $scope.teamlist = resp.data.teams;
                    $scope.userlist = resp.data.users;
                }
            });
        } else {
            // 单个编辑
            TeamServe.get({ session_id: $rootScope.session.session_id, team_id: $stateParams.teamid }, function(resp) {
                console.log(resp);
                $scope.team = resp.data.teams[0];
                console.log($scope.team);
            });
        }

        //添加/编辑团队
        $scope.saveTeam = function() {
            console.log('post new team');
            if ($scope.newteamForm.$valid) {
                console.log('save...');
                console.log($rootScope.session);
                console.log('$rootScope.session.session_id:' + $rootScope.session.session_id);

                var teamResource = new TeamServe($scope.team);
                console.log(teamResource);
                teamResource.$save({ session_id: $rootScope.session.session_id }, function(data) {
                    console.log(data);
                    console.log('添加/编辑团队成功');
                    $state.go('app.team');
                }, function() {
                    console.log('添加/编辑团队失败');
                })
            }
        };

        //删除团队
        $scope.deleteTeam = function(team_id) {
            console.log('删除团队...');
            var teamResource = new TeamServe($scope.team);
            teamResource.$remove({ session_id: $rootScope.session.session_id, id: team_id }, function(resp) {
                console.log(resp);
                console.log('删除成功');

                //本地数据移除删除掉的team
                $scope.teamlist = $filter('filter')($scope.teamlist, { id: '!' + team_id });
            });
        };

        //dialog代码
        var $ctrl = this;
        $ctrl.items = ['item1', 'item2', 'item3'];

        $ctrl.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/components/team/addMenber.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $ctrl.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // $ctrl.openComponentModal = function() {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         component: 'modalComponent',
        //         resolve: {
        //             items: function() {
        //                 return $ctrl.items;
        //             }
        //         }
        //     });

        //     modalInstance.result.then(function(selectedItem) {
        //         $ctrl.selected = selectedItem;
        //     }, function() {
        //         $log.info('modal-component dismissed at: ' + new Date());
        //     });
        // };
        //end dialog
    }
])

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', ['$uibModalInstance', 'items', function($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}])

// // Please note that the close and dismiss bindings are from $uibModalInstance.
// .component('modalComponent', {
//     templateUrl: '/components/team/addMenber.html',
//     bindings: {
//         resolve: '<',
//         close: '&',
//         dismiss: '&'
//     },
//     controller: function() {
//         var $ctrl = this;

//         $ctrl.$onInit = function() {
//             $ctrl.items = $ctrl.resolve.items;
//             $ctrl.selected = {
//                 item: $ctrl.items[0]
//             };
//         };

//         $ctrl.ok = function() {
//             $ctrl.close({ $value: $ctrl.selected.item });
//         };

//         $ctrl.cancel = function() {
//             $ctrl.dismiss({ $value: 'cancel' });
//         };
//     }
// });
