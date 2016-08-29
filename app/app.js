'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
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
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    // $locationProvider.hashPrefix('!');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller:'HomeCtrl'
    })

    .state('taskdetail', {
        url: 'task/taskid/:taskid',
        templateUrl: 'task/task.html',
        controller:'TaskCtrl'
    })

    .state('register', {
        url: '/',
        templateUrl: 'register/register.html',
        controller:'ResiterCtrl'
    })

    .state('login', {
        url: '/',
        templateUrl: 'login/login.html',
        controller:'LoginCtrl'
    })

    .state('user', {
        url: '/',
        templateUrl: 'user/userlist.html',
        controller:'UserCtrl'
    })

    .state('project', {
        url: '/',
        templateUrl: 'project/projectlist.html',
        controller:'ProjectCtrl'
    })

    .state('log', {
        url: '/',
        templateUrl: 'log/log.html',
        controller:'LogCtrl'
    })

    .state('comment', {
        url: '/',
        templateUrl: 'comment/comment.html',
        controller:'CommentCtrl'
    });

    $urlRouterProvider.otherwise('/');
}]);
