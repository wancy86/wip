'use strict';

angular.module('myApp')

// .config(['$stateProvider', function($stateProvider) {
//     $stateProvider.state('register', {
//         url:'register',
//         templateUrl: 'components/register/register.html',
//         controller: 'RegisterCtrl'
//     });
// }])

.controller('RegisterCtrl', ['$scope', '$stateParams','RegisterServe', function($scope, $stateParams,RegisterServe) {
    console.log('RegisterCtrl');
    $scope.account = {};

    $scope.postRegister = function() {
        console.log('post register');
        console.log($scope.account);
        var acoount = new RegisterServe($scope.account);
        window.acoount = acoount;
        console.log(acoount);
        // acoount.$save();
    }

}]);
