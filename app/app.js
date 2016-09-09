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

    $stateProvider.state('app', {
        url: '/',
        templateUrl: 'app.html'
            // controller: 'HomeCtrl'
    })

    .state('app.home', {
        url: 'home',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
    })

    .state('app.taskdetail', {
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

    .state('app.user', {
        url: 'user',
        templateUrl: 'components/user/userlist.html',
        controller: 'UserCtrl'
    })

    .state('app.project', {
        url: 'project',
        templateUrl: 'components/project/projectlist.html',
        controller: 'ProjectCtrl'
    })

    .state('app.team', {
        url: 'team',
        templateUrl: 'components/team/teamlist.html',
        controller: 'TeamCtrl'
    })

    .state('app.log', {
        url: 'log',
        templateUrl: 'components/log/log.html',
        controller: 'LogCtrl'
    })

    .state('app.comment', {
        url: 'comment',
        templateUrl: 'components/comment/comment.html',
        controller: 'CommentCtrl'
    });

    $urlRouterProvider.otherwise('register');
}]);
