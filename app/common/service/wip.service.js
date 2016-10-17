'use strict';

//Back end API server name
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

.service('AccountServe', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
    return {
        login: function(account) {
            $http({
                url: ServerName + 'account/login',
                method: "post",
                data: $.param(account),
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
            }).success(function(Resp) {
                if (Resp.code == "50000") {
                    console.log('登录成功');
                    console.log(Resp);

                    $rootScope.session = Resp.data;
                    console.log('$rootScope.session:' + $rootScope.session);
                    $rootScope.login = 1;

                    //TODO set cookie
                    // $state.go('app.task_detail', { taskid: 1 });
                    $state.go('app.task');
                } else {
                    console.log(Resp.msg);
                }

            });
        },
        logoff: function() {
            console.log('logoff');
            $rootScope.login = 0;
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
    return $resource(ServerName + 'my_item', {}, {
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
