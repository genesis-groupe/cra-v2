app.factory('ParameterRes', ['$resource',
    function($resource) {
        'use strict';
        return $resource(
            '/parameters'
        );
    }]);
