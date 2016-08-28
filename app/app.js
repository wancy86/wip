'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.menu',
    'myApp.register',
    'myApp.login',
    'myApp.user',
    'myApp.project',
    'myApp.task',
    'myApp.log',
    'myApp.comment',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    // $routeProvider.otherwise({ redirectTo: '/home' });
}]);
