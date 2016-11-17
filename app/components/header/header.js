'use strict';

angular.module('myApp')

.controller('HeaderCtrl', ['$scope', '$rootScope', 'AccountServe', function($scope, $rootScope, AccountServe) {
    if (!$rootScope.account) {
        $rootScope.account = {}
    }
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
        scope: true,
        templateUrl: 'components/header/header.html'
    }
});
