'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

        .state('app.team_new', {
        url: '/team/new',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
    })

    .state('app.team_edit', {
        url: '/team/teamid/:teamid',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
    });
}])

.controller('TeamCtrl', ['TeamServe', '$stateParams', '$scope', '$http', '$rootScope', '$uibModal', '$log',
    function(TeamServe, $stateParams, $scope, $http, $rootScope, $uibModal, $log) {
        console.log('now in TeamCtrl...');
        // if (!$stateParams.teamid) {
        //     $http({
        //         method: 'GET',
        //         url: 'data/team/teams.json'
        //     }).then(function(resp) {
        //         $scope.teamlist = resp.data;
        //         console.log(resp.data);
        //     });
        // } else {
        //     $scope.team = TeamServe.get({ teamid: $stateParams.teamid }, function(data) {
        //         console.log(data);
        //     });
        // }
        // $scope.team = {
        //     id: 123,
        //     name: 'my team',
        //     code: 'MAX',
        //     description: 'xxxxxxxxxxxxxxxxx'
        // };

        $scope.teamlist = [{
            id: 123,
            name: 'my team',
            code: 'MAX',
            description: 'xxxxxxxxxxxxxxxxx'
        }, {
            id: 123,
            name: 'my team',
            code: 'MAX',
            description: 'xxxxxxxxxxxxxxxxx'
        }];

        $scope.postNewTeam = function() {
            console.log('post new team');
            if ($scope.newteamForm.$valid) {
                console.log('save...');
                console.log($rootScope.session);
                console.log('$rootScope.session.session_id:' + $rootScope.session.session_id);
                // $scope.team.session_id = $rootScope.session.session_id;

                var teamResource = new TeamServe($scope.team);
                console.log(teamResource);
                teamResource.$save(function(data) {
                    console.log(data);
                    console.log('添加团队成功');
                }, function() {
                    console.log('添加团队失败');
                })
            }
        }

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

        $ctrl.openComponentModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'modalComponent',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $ctrl.selected = selectedItem;
            }, function() {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };
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

// Please note that the close and dismiss bindings are from $uibModalInstance.
.component('modalComponent', {
    templateUrl: '/components/team/addMenber.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function() {
        var $ctrl = this;

        $ctrl.$onInit = function() {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.selected = {
                item: $ctrl.items[0]
            };
        };

        $ctrl.ok = function() {
            $ctrl.close({ $value: $ctrl.selected.item });
        };

        $ctrl.cancel = function() {
            $ctrl.dismiss({ $value: 'cancel' });
        };
    }
});
