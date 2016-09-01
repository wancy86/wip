'use strict';

angular.module('myApp')

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/log', {
//     templateUrl: 'log/log.html',
//     controller: 'LogCtrl'
//   });
// }])

.controller('LogCtrl', [function() {
    console.log('now in LogCtrl...');
    
}])

.directive('log', function() {
    return {
        // restrict: 'E',
        templateUrl: 'components/log/log.html',
        controller: 'LogCtrl'
    }
});