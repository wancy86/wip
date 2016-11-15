'use strict';

angular.module('myApp')

.controller('LogCtrl', [function() {
    
}])

.directive('log', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/log/log.html',
        controller: 'LogCtrl'
    }
});