'use strict';

angular.module('myApp')

.controller('HeaderCtrl', ['$scope', 'AccountServe', function($scope, AccountServe) {
    $scope.loginPost = function() {
        if ($scope.loginForm.$valid) {
            AccountServe.login($scope.account);
        }
    }

    $scope.logoff = function() {
        AccountServe.logoff();
    }


}])

.directive('header', function() {
    return {
        restrict: 'AE',
        scope: false,
        templateUrl: 'components/header/header.html'
    }
});
