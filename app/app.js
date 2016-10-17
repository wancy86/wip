'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'myApp.menu',
    'myApp.version'
])

//run after all DI done
// .run(['$state', function($state) {
//     $state.go('register');
// }])

.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider) {
    // $locationProvider.hashPrefix('!');
    // $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('app', {
        url: '/',
        templateUrl: 'app.html'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'components/register/register.html',
        controller: 'RegisterCtrl'
    })

    .state('app.home', {
        url: 'home',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
    })

    .state('app.user', {
        url: 'user',
        templateUrl: 'components/user/userlist.html',
        controller: 'UserCtrl'
    })

    .state('app.project', {
        url: 'project/list',
        templateUrl: 'components/project/projectlist.html',
        controller: 'ProjectCtrl'
    })

    .state('app.team', {
        url: 'team',
        templateUrl: 'components/team/teamlist.html',
        controller: 'TeamCtrl'
    })

    .state('app.task', {
        url: 'task/list',
        templateUrl: 'components/task/tasklist.html',
        controller: 'TaskCtrl'
    });

    $urlRouterProvider.otherwise('register');
}])

.controller('AppCtrl', ['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.login = 0;

    //添加事件监听
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'register') return; // 如果是进入登录界面则允许
        // 如果用户不存在
        if (!$rootScope.session || !$rootScope.session.session_id) {
            event.preventDefault(); // 取消默认跳转行为
            $state.go("register", { from: fromState.name, w: 'notLogin' }); //跳转到登录界面
        }
    });
}])

