'use strict';

angular.module('myApp.menu', ['ngRoute', 'myApp'])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
    // $scope.menu = 'home';
    $scope.menuItems = [
        { text: 'register', sref: 'register' },
        { text: 'login', sref: 'login' },
        { text: 'user', sref: 'user' },
        { text: 'project', sref: 'project' },
        // { text: 'task' ,sref:'task'},
        { text: 'comment', sref: 'comment' },
        { text: 'log', sref: 'log' }
    ];
    $scope.menClick = function(item) {
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
