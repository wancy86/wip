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
        templateUrl: 'components/home/home.html',
        controller:'HomeCtrl'
    })

    .state('taskdetail', {
        url: 'task/taskid/:taskid',
        templateUrl: 'components/task/task.html',
        controller:'TaskCtrl'
    })

    .state('register', {
        url: '/',
        templateUrl: 'components/register/register.html',
        controller:'ResiterCtrl'
    })

    .state('login', {
        url: '/',
        templateUrl: 'components/login/login.html',
        controller:'LoginCtrl'
    })

    .state('user', {
        url: '/',
        templateUrl: 'components/user/userlist.html',
        controller:'UserCtrl'
    })

    .state('project', {
        url: '/',
        templateUrl: 'components/project/projectlist.html',
        controller:'ProjectCtrl'
    })

    .state('log', {
        url: '/',
        templateUrl: 'components/log/log.html',
        controller:'LogCtrl'
    })

    .state('comment', {
        url: '/',
        templateUrl: 'components/comment/comment.html',
        controller:'CommentCtrl'
    });

    $urlRouterProvider.otherwise('/');
}]);
