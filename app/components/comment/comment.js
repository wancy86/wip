'use strict';

angular.module('myApp')

.controller('CommentCtrl', [function() {

}])

.directive('comment', function() {
    return {
        restrict: 'AE',
        templateUrl: 'components/comment/comment.html',
        controller: 'CommentCtrl'
    }
});
