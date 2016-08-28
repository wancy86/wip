'use strict';

angular.module('myApp.user', ['ngRoute'])

.service('UserServe', ['$resource', function($resource) {
    return $resource('data/user/:userid.json', {}, {
        query: {
            method: 'GET',
            params: { userid: 'userid' },
            isArray: true
        }
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'user/userlist.html',
        controller: 'UserCtrl'
    })

    .when('/user/userid/:userid', {
        templateUrl: 'user/user.html',
        controller: 'UserCtrl'
    })

    .when('/user/new', {
        templateUrl: 'user/user.html',
        controller: 'UserCtrl'
    });
}])

.controller('UserCtrl', ['$http', '$scope', '$routeParams', 'UserServe', function($http, $scope, $routeParams, UserServe) {
    console.log('now in UserCtrl...');
    if (!$routeParams.userid) {
        //get all user
        $http({
            method: 'GET',
            url: 'data/user/users.json'
        }).then(function(Resp) {
            $scope.userlist = Resp.data;
        });
    } else {
        UserServe.get({ userid: $routeParams.userid }, function(resp) {
            $scope.user = resp;
        });
    }

}]);
