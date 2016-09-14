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

                    // $rootScope.session_id = Resp.data.session_id;
                    // $rootScope.first_name = Resp.data.first_name;
                    // $rootScope.last_name = Resp.data.last_name;
                    // $rootScope.email = Resp.data.email;
                    // $rootScope.mobile = Resp.data.mobile;
                    $rootScope.session = Resp.data;
                    console.log('$rootScope.session:' + $rootScope.session);
                    $rootScope.login = 1;

                    //set cookie
                    $state.go('app.home');
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

.service('TeamServe', ['$resource', '$rootScope', function($resource, $rootScope) {
    return $resource(ServerName + 'team', {}, {
        save: {
            method: 'POST',
            params: {
                session_id: "$rootScope.session.session_id"
            }
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

.service('UserServe', ['$resource', function($resource) {
    return $resource('data/user/:userid.json', {}, {
        //query action:
        query: {
            // url:'www.xx.com/xx/xx',
            // timeout: 10000,
            method: 'GET',
            params: { userid: 'userid' },
            isArray: true
        }
    });
}])

.service('ProjectServe', ['$resource', function($resource) {
    //$resource(url, [paramDefaults], [actions], options);
    return $resource('data/project/:projectid.json', {}, {
        query: {
            method: 'GET',
            params: {
                projectid: 'projectid'
            },
            isArray: true
        }
    });
}])
