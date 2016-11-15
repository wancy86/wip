'use strict';

angular.module('myApp')

.controller('FooterCtrl', ['$scope', '$location', function($scope, $location) {
}])

.directive('footer', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/footer/footer.html',
        controller: 'FooterCtrl'
    }
});

