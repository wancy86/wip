'use strict';

angular.module('myApp')

.controller('RegisterCtrl', ['$scope', '$stateParams', 'RegisterServe', '$http', '$state', function($scope, $stateParams, RegisterServe, $http, $state) {
    console.log('RegisterCtrl');
    // $scope.account = {};

    $scope.mobileRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
    $scope.emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
    $scope.pwdRegx = "[a-zA-Z0-9]*";

    // process the form
    $scope.processForm = function() {
        console.log('processForm...');
        console.log($scope.registerForm);
        console.log($scope.account);

        if ($scope.registerForm.$valid) {
            var acoount = new RegisterServe($scope.account);
            // window.acoount = acoount;
            // console.log(acoount.$save);
            acoount.$save({ /*params*/ }).then(function() {
                //on success
                console.log('注册成功');

                //TODO 注册完成后进入 主页
                $state.go('app.home');
            });
        }
    };

}]);

