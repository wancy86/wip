'use strict';

angular.module('myApp.menu', ['ngRoute', 'myApp'])

.controller('MenuCtrl', ['$scope','$rootScope', '$location', function($scope,$rootScope, $location) {
    // $scope.menu = 'home';
    $scope.menuItems2 = [
        { text: '我的任务', sref: 'app.task', icon: 'glyphicon glyphicon-leaf' },
        { text: '添加任务', sref: 'app.task_new', icon: 'glyphicon glyphicon-plus' },
        { text: '我的项目', sref: 'app.project', icon: 'glyphicon glyphicon-tree-conifer' },
        { text: '添加项目', sref: 'app.project_new', icon: 'glyphicon glyphicon-plus' },
        { text: '我的团队', sref: 'app.team', icon: 'glyphicon glyphicon-user' },
        { text: '添加团队', sref: 'app.team_new', icon: 'glyphicon glyphicon-plus' }
    ];

    $scope.menuItems1 = [
        { text: 'register', sref: 'register', icon: 'glyphicon glyphicon-pushpin' },
        { text: 'user', sref: 'app.user', icon: 'glyphicon glyphicon-pushpin' },
        { text: 'comment', sref: 'app.comment', icon: 'glyphicon glyphicon-pushpin' },
        { text: 'log', sref: 'app.log', icon: 'glyphicon glyphicon-pushpin' }
    ];

    $scope.menuClick = function(item) {
        $rootScope.menu = item;
        // console.log($location.absUrl());
    }
}])

.directive('menu', function() {
    return {
        // restrict: 'E',
        templateUrl: 'components/menu/menu.html',
        controller: 'MenuCtrl'
    }
});
