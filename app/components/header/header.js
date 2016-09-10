'use strict';

angular.module('myApp')

.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
    console.log('now in HeaderCtrl...');
    $scope.name = "mark";
    
    $scope.loginPost = function() {
        console.log('post login...');
        // $scope.account.mobile_email
        // $scope.account.password
        console.log($scope.account);
        if (0)
            $http({
                url: "",
                method: "post",
                data: $.param($scope.account),
                headers: { "content_Type": "application/x-www-form-urlencoded;charset=utf-8" }
            }).success(function(data) {
                console.log('login success...');
            });

    }

}])

.directive('header', function() {
    return {
        restrict: 'AE',
        scope: false,
        templateUrl: 'components/header/header.html'
        // controller: 'HeaderCtrl'
    }
});
