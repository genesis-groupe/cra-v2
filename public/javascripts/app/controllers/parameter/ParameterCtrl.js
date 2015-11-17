app.controller('ParameterCtrl', ['$rootScope', '$scope', '$http', '$log', '$location', 'ParameterRes',
    function ($rootScope, $scope, $http, $log, $location, ParameterResource) {
        'use strict';
        ParameterResource.query().$then(function (parameters) {
            $scope.parameters = parameters.data;
            $scope.current = _.find(parameters.data, function (p) {
                return p.endDate === null;
            });
            $scope.current.startDate =  moment($scope.current.startDate).format('DD/MM/YYYY');
            $scope.current.endDate = $scope.current.endDate ? moment($scope.current.endDate).format("DD/MM/YYYY") : null;

        });

        function Current(c){
            this.id = c.id;
            this.startDate = moment(c.startDate, 'DD/MM/YYYY').valueOf();
            this.endDate = null;
            this.zoneAmount = c.zoneAmount;
            this.car = [];
            this.car[0] = c.car[0];
            this.car[5] = c.car[5];
            this.car[8] = c.car[8];
            this.car[11] = c.car[11];
            this.motorcycle = [];
            this.motorcycle[0] = c.motorcycle[0];
            this.motorcycle[501] = c.motorcycle[501];
        }

        $scope.save = function () {
            $scope.errors = {};
            var route = jsRoutes.controllers.JParameters.save();
            var current = new Current($scope.current);

            $http({
                'method': route.method,
                'url': route.url,
                'data': current
            })
                .success(function(parameters, status, headers, config) {
                    $rootScope.onSuccess("Les paramètres on été sauvegardés.");
                })
                .error(function(errors, status, headers, config) {
                    _(errors).forEach(function(err, key) {
                        $scope.errors[key] = err.join('<br>');
                    });
                });
        }
    }]
);
