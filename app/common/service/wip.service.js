'use strict';

//Back end API server name
var ServerName = 'localhost:8000/';

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
        query: {
            method: 'GET',
            params: { userid: 'userid' },
            isArray: true
        }
    });
}])

.service('ProjectServe', ['$resource', function($resource) {
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
    return $resource(ServerName + 'account/:userid', { userid: '@userid' }, {
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