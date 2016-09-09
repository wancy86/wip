'use strict';

//Back end API server name
var ServerName = 'http://192.168.1.6:8000/service';

angular.module('myApp')

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

.service('RegisterServe', ['$resource', function($resource) {
    return $resource(ServerName + '/account/register', { userid: '@userid' }, {
        query: {
            method: 'GET',
            params: {
                userid: 'userid'
            },
            isArray: true
        }
    });
}])


.service('TeamServe', ['$resource', function($resource) {
    return $resource(ServerName + 'team/:teamid', { teamid: '@teamid' }, {
        query: {
            method: 'GET',
            params: {
                teamid: 'teamid'
            },
            isArray: true
        }
    });
}])
