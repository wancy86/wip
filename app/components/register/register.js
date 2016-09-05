'use strict';

angular.module('myApp')

// .config(['$stateProvider', function($stateProvider) {
//     $stateProvider.state('register', {
//         url:'register',
//         templateUrl: 'components/register/register.html',
//         controller: 'RegisterCtrl'
//     });
// }])

.controller('RegisterCtrl', ['$scope', '$stateParams', 'RegisterServe','$http', function($scope, $stateParams, RegisterServe,$http) {
    console.log('RegisterCtrl');
    $scope.account = {};

    $scope.formData = {};
    // process the form
    $scope.processForm = function() {
        console.log('processForm...');
        console.log($scope.registerForm);
        return false;
        $http({
                method: 'POST',
                url: '/user/',
                data: $.param($scope.formData), // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
                console.log(data);

                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                    $scope.errorSuperhero = data.errors.superheroAlias;
                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
            });
    };



    $scope.postRegister = function() {
        console.log('post register');
        console.log($scope.account);
        var acoount = new RegisterServe($scope.account);
        window.acoount = acoount;
        console.log(acoount);
        // acoount.$save();
    }

}]);
