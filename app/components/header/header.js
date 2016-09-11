'use strict';

angular.module('myApp')

.controller('HeaderCtrl', ['$scope', 'AccountServe', function($scope, AccountServe) {
    console.log('now in HeaderCtrl...');

    $scope.account = {
        user_name: "13028865078",
        password: "123123"
    }

    $scope.loginPost = function() {
        AccountServe.login($scope.account);
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
