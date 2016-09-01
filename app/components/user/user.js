'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

    // .state('user', {
    //     url:'/user',
    //     templateUrl: 'user/userlist.html',
    //     controller: 'UserCtrl'
    // })

    .state('user.edit', {
        url:'/user/userid/:userid',
        templateUrl: 'user/user.html',
        controller: 'UserCtrl'
    })

    .state('user.new', {
        url:'/user/new',
        templateUrl: 'user/user.html',
        controller: 'UserCtrl'
    });
}])

.controller('UserCtrl', ['$http', '$scope', '$stateParams', 'UserServe', function($http, $scope, $stateParams, UserServe) {
    console.log('now in UserCtrl...');
    if (!$stateParams.userid) {
        //get all user
        $http({
            method: 'GET',
            url: 'data/user/users.json'
        }).then(function(Resp) {
            $scope.userlist = Resp.data;
        });
    } else {
        UserServe.get({ userid: $stateParams.userid }, function(resp) {
            $scope.user = resp;
        });
    }

}]);
