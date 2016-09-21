'use strict';

//Back end API server name
var ServerName = 'http://192.168.1.6:8000/service/';

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

                    //set cookie
                    $state.go('app.project');
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

.factory('TasksServe', ['$resource', function($resource) {
    return $resource('/data/task/tasks.json', {}, {
        query: {
            method: 'GET',
            // params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])

.factory('TaskServe', ['$resource', function($resource) {
    return $resource('/data/task/:taskid.json', {}, {
        query: {
            method: 'GET',
            params: { taskid: 'taskid' },
            isArray: true
        }
    });
}])
