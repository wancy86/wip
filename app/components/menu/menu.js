'use strict';

angular.module('myApp.menu', ['ngRoute', 'myApp'])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
    // $scope.menu = 'home';
    $scope.menuItems2 = [
        { text: '项目管理', sref: 'app.project' },
        { text: '我的团队', sref: 'app.team' },
        { text: '添加团队', sref: 'app.team_new' }
    ];

    $scope.menuItems1 = [
        { text: 'register', sref: 'register' },
        { text: 'login', sref: 'login' },
        { text: 'user', sref: 'app.user' },
        { text: 'comment', sref: 'app.comment' },
        { text: 'log', sref: 'app.log' }
    ];

    $scope.menuClick = function(item) {
        $scope.menu = item;
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
