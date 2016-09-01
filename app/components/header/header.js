'use strict';

angular.module('myApp')

.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
    console.log('now in HeaderCtrl...');
}])

.directive('header', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/header/header.html',
        controller: 'HeaderCtrl'
    }
});
