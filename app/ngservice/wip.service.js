'use strict';

//Back end API server name
// var ServerName = 'http://coomark.51vip.biz:8000/service/';
var ServerName = 'http://127.0.0.1:8000/service/';

angular.module('myApp')

.service('RegisterServe', ['$resource', function($resource) {
    return $resource(ServerName + 'account/register', { userid: '@userid' }, {
        query: {
            method: 'GET',
            params: {
                userid: 'userid'
            },
            isArray: true
        }
    });
}])

.service('AccountServe', ['$http', '$rootScope', '$state', '$cookies', 'alertMsgServe', function($http, $rootScope, $state, $cookies, alertMsgServe) {
    return {
        login: function(account) {
            $http({
                url: ServerName + 'account/login',
                method: "post",
                data: $.param(account),
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
            }).success(function(resp) {
                if (resp.code == "50000") {

                    $rootScope.session = resp.data;                    
                    $cookies.put('session', resp.data.session_id);
                    $rootScope.login = 1;
                    $state.go('app.task');
                } else {
                    alertMsgServe.alert(resp.msg);
                }
            });
        },
        logoff: function() {
            $rootScope.login = 0;
            $rootScope.session = null;
            $cookies.remove('session');
        }
    }
}])

.service('TeamServe', ['$resource', '$rootScope', '$http', function($resource, $rootScope, $http) {
    return $resource(ServerName + 'team', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            cache: false,
            isArray: false
        }
    });
}])

.service('UserServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'user', {}, {
        query: {
            method: 'GET',
            isArray: false,
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
        }
    });
}])

.service('TeamMemberServe', ['$resource', '$rootScope', '$http', function($resource, $rootScope, $http) {
    return $resource(ServerName + 'team_member', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            cache: false,
            isArray: false
        }
    });
}])

.service('ProjectServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'project', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            isArray: false
        }
    });
}])

.factory('TaskServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'item', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            isArray: false
        }
    });
}])

.factory('MyTaskServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'item_search', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            isArray: false
        }
    });
}])

.factory('LogServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'item_work', {}, {
        query: {
            method: 'GET',
            params: {
                session_id: function() {
                    return $rootScope.session.session_id;
                }
            },
            isArray: false
        }
    });
}])
