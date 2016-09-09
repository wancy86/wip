'use strict';

angular.module('myApp')

.controller('RegisterCtrl', ['$scope', '$stateParams', 'RegisterServe', '$http', '$state', function($scope, $stateParams, RegisterServe, $http, $state) {
    console.log('RegisterCtrl');
    // $scope.account = {};


    // process the form
    $scope.processForm = function() {
        console.log('processForm...');
        console.log($scope.registerForm);
        console.log('post register');
        console.log($scope.account);

        //RegisterServe.query();

        var acoount = new RegisterServe($scope.account);
        // var acoount = new RegisterServe({});
        window.acoount = acoount;
        console.log(acoount.$save);
        acoount.$save({ /*params*/ }, function() {
            //on success
            console.log('注册成功');

            //TODO 注册完成后进入 主页
            //$state.go('app.home');
        }, function() {
            //on error
            

        });

        // return false;

        // $scope.formData = {};
        // $http({
        //         method: 'POST',
        //         url: '/user/',
        //         data: $.param($scope.formData), // pass in data as strings
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
        //     })
        //     .success(function(data) {
        //         console.log(data);

        //         if (!data.success) {
        //             // if not successful, bind errors to error variables
        //             $scope.errorName = data.errors.name;
        //             $scope.errorSuperhero = data.errors.superheroAlias;
        //         } else {
        //             // if successful, bind success message to message
        //             $scope.message = data.message;
        //         }
        //     });
    };

}]);
