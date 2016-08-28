'use strict';

angular.module('myApp.menu', ['ngRoute','myApp'])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
    // $scope.menu = 'home';
    $scope.menuItems = [
        { text: 'register' },
        { text: 'login' },
        { text: 'user' },
        { text: 'project' },
        // { text: 'task' },
        { text: 'comment' },
        { text: 'log' }
    ];
    $scope.menClick = function(item) {
        $scope.menu = item;
        // console.log($location.absUrl());
    }
}])

.directive('menu', function() {
    return {
        // restrict: 'E',
        templateUrl: 'menu/menu.html',
        controller: 'MenuCtrl'
    }
});
