'use strict';

angular.module('myApp.register')

.factory('Phone', ['$resource',
    function($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {
                method: 'GET',
                params: { phoneId: 'phones' },
                isArray: true
            }
        });
    }
]);
