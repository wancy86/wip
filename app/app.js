'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngResource',
    'ngCookies',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'menu'
])

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

.controller('AppCtrl', ['$rootScope', '$state', '$cookies', 'alertMsgServe', function($rootScope, $state, $cookies, alertMsgServe) {
    // $rootScope.login = 0;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'register') return; // 
        if (!$rootScope.session || !$rootScope.session.session_id) {
            event.preventDefault(); // 
            $state.go("register", { from: fromState.name, w: 'notLogin' }); //
        }
    });

    $rootScope.$watch('session', function() {
        if ($rootScope.session) {
            var re = /[\u4e00-\u9fa5]/;
            if (re.test($rootScope.session.last_name + $rootScope.session.first_name)) {
                //has Chinese in name then firstname+lastname
                $rootScope.session.display_name = $rootScope.session.last_name + $rootScope.session.first_name;
            } else {
                $rootScope.session.display_name = $rootScope.session.last_name + ' ' + $rootScope.session.first_name;
            }
        }
    });

}])
