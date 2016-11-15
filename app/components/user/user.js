'use strict';

angular.module('myApp')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider

    .state('app.user_edit', {
        url:'user/userid/:userid',
        templateUrl: 'components/user/user.html',
        controller: 'UserCtrl'
    })

    .state('app.user_new', {
        url:'/user/new',
        templateUrl: 'components/user/user.html',
        controller: 'UserCtrl'
    });
}])

.controller('UserCtrl', ['$http', '$scope', '$stateParams', 'UserServe', function($http, $scope, $stateParams, UserServe) {
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
