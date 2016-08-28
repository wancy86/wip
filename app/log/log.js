'use strict';

angular.module('myApp.log', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/log', {
    templateUrl: 'log/log.html',
    controller: 'LogCtrl'
  });
}])

.controller('LogCtrl', [function() {
    console.log('now in LogCtrl...');
    
}]);