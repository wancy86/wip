'use strict';

angular.module('myApp')

.controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', '$cookies', 'RegisterServe', 'alertMsgServe', function($scope, $rootScope, $http, $state, $stateParams, $cookies, RegisterServe, alertMsgServe) {

    $scope.mobileRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
    $scope.emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
    $scope.pwdRegx = "[a-zA-Z0-9]*";

    // process the form
    $scope.processForm = function() {

        if ($scope.registerForm.$valid) {
            var acoount = new RegisterServe($scope.register);
            acoount.$save().then(function(resp) {
                //on success
                // console.log('XXXX: ', resp)
                if (resp.code == '50000') {
                    //TODO 注册完成之后，需要返回session
                    $rootScope.session = resp.data;
                    $cookies.put('session', resp.data.session_id);
                    $rootScope.account = {
                        user_name: $rootScope.session.mobile
                    }
                    $rootScope.login = 1;
                    $state.go('app.task');
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        }
    };
}]);
