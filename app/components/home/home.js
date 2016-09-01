'use strict';

angular.module('myApp')

.controller('HomeCtrl', ['$scope', 'TasksServe','$window', function($scope, TasksServe, $window) {
    $scope.tasklist = TasksServe.query({}, function(data) {
        console.log(data);
    });
}]);

// .config(['$stateProvider', function($stateProvider) {
//     $stateProvider.state('home', {
//         url:'/',
//         templateUrl: 'components/home/home.html',
//         controller: 'HomeCtrl'
//     });
// }]);
