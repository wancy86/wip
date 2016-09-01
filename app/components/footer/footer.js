'use strict';

angular.module('myApp')

.controller('FooterCtrl', ['$scope', '$location', function($scope, $location) {
    console.log('now in FooterCtrl...');
}])

.directive('footer', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/footer/footer.html',
        controller: 'FooterCtrl'
    }
});
