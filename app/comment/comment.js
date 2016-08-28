'use strict';

angular.module('myApp.comment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/comment', {
    templateUrl: 'comment/comment.html',
    controller: 'CommentCtrl'
  });
}])

.controller('CommentCtrl', [function() {
    console.log('now in CommentCtrl...');
    
}]);