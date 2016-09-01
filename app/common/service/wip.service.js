'use strict';

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