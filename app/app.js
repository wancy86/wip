'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'myApp.menu',
    // 'myApp.user',
    // 'myApp.project',
    // 'myApp.log',
    // 'myApp.comment',
    'myApp.version'
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    // $locationProvider.hashPrefix('!');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
    })

    .state('taskdetail', {
        url: 'task/taskid/:taskid',
        templateUrl: 'components/task/task.html',
        controller: 'TaskCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'components/register/register.html',
        controller: 'RegisterCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
    })

    .state('user', {
        url: '/user',
        templateUrl: 'components/user/userlist.html',
        controller: 'UserCtrl'
    })

    .state('project', {
        url: '/project',
        templateUrl: 'components/project/projectlist.html',
        controller: 'ProjectCtrl'
    })

    .state('log', {
        url: '/log',
        templateUrl: 'components/log/log.html',
        controller: 'LogCtrl'
    })

    .state('comment', {
        url: '/comment',
        templateUrl: 'components/comment/comment.html',
        controller: 'CommentCtrl'
    });

    $urlRouterProvider.otherwise('/');
}]);
