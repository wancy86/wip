angular.module('myApp')

.directive('alertMsg', function() {
    return {
        restrict: 'AE',
        scope: {
            alertMessages: "="
        },
        templateUrl: 'components/alert_msg/alert_msg.html',
        controller: 'alertMsgCtrl'
    }
})

.controller('alertMsgCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    // console.log('alertMsgCtrl: ',$scope.alertMessages)
}])

.service('alertMsgServe', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    $rootScope.alertMessages = [];
    this.alert = function() {
        if (arguments.length == 0) return;
        var msgs = '';
        for (var i = 0; i < arguments.length; i++) {
            msgs += ' ' + arguments[i];
        }
        $rootScope.alertMessages.push(msgs);
        $timeout(function() {
            var x = $rootScope.alertMessages.shift();
        }, 3000 * $rootScope.alertMessages.length);

    }
}])
