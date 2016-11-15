'use strict';

angular.module('menu', [])

.controller('MenuCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.menuItems = [
        { text: '我的任务', sref: 'app.task', subitem: 0, icon: 'glyphicon glyphicon-leaf' },
        { text: '添加任务', sref: 'app.task_new', subitem: 1, icon: 'glyphicon glyphicon-plus' },
        { text: '我的项目', sref: 'app.project', subitem: 0, icon: 'glyphicon glyphicon-tree-conifer' },
        { text: '添加项目', sref: 'app.project_new', subitem: 1, icon: 'glyphicon glyphicon-plus' },
        { text: '我的团队', sref: 'app.team', subitem: 0, icon: 'glyphicon glyphicon-user' },
        { text: '添加团队', sref: 'app.team_new', subitem: 1, icon: 'glyphicon glyphicon-plus' }
    ];

    $scope.menuClick = function(item) {
        $rootScope.menu = item;
    }
}])

.directive('menu', function() {
    return {
        // restrict: 'E',
        templateUrl: 'components/menu/menu.html',
        controller: 'MenuCtrl'
    }
});
