'use strict';

angular.module('myApp.menu', ['ngRoute', 'myApp'])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
    // $scope.menu = 'home';
    $scope.menuItems = [
        { text: 'register', sref: 'register' },
        { text: 'login', sref: 'login' },
        { text: 'user', sref: 'app.user' },
        { text: 'project', sref: 'app.project' },
        { text: 'team', sref: 'app.team' },
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
