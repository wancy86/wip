'use strict';

angular.module('myApp')

// .config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/comment', {
//         templateUrl: 'comment/comment.html',
//         controller: 'CommentCtrl'
//     });
// }])

.controller('CommentCtrl', [function() {
    console.log('now in CommentCtrl...');

}])

.directive('comment', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/comment/comment.html',
        controller: 'CommentCtrl'
    }
});
