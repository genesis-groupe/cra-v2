app.controller('BackOfficeUsersCtrl', ['$scope', '$http', '$log', '$location', '$routeParams', '$rootScope',
    function ($scope, $http, $log, $location, $routeParams, $rootScope) {
        'use strict';

        $scope.sortBys = [
            {key: '+username', label: 'Username (asc)'},
            {key: '-username', label: 'Username (desc)'},
            {key: '+firstName', label: 'Prénom (asc)'},
            {key: '-firstName', label: 'Prénom (desc)'},
            {key: '+lastName', label: 'Nom (asc)'},
            {key: '-lastName', label: 'Nom (desc)'}
        ];

        $scope.filter = {
            'role': 'employee',
            'sortBy': $scope.sortBys[0].key
        };

        $scope.filterChange = function () {
            $scope.loadUsers();
        };

        $scope.sortByChange = function () {
            $scope.users = sort($scope.users);
        };

        var sort = function (list) {
            var field = $scope.filter.sortBy.substr(1),
                direction = $scope.filter.sortBy.substr(0, 1) === '+' ? 'asc' : 'desc',
                result = _(list).sortBy(field);
            if (direction === 'desc') {
                result.reverse();
            }
            return result.valueOf();
        };

        $scope.users = [];
        $scope.user = {};

        $scope.loadUsers = function () {
            var route;
            switch ($scope.filter.role) {
                case 'employee':
                    route = jsRoutes.controllers.JUsers.employees();
                    break;
                case 'manager':
                    route = jsRoutes.controllers.JUsers.managers();
                    break;
                default:
                    route = jsRoutes.controllers.JUsers.users();
            }


            $http({
                'method': route.method,
                'url': route.url,
                'cache': false
            })
                .success(function (users, status, headers, config) {
                    $scope.users = sort(users);
                })
                .error(function (error, status, headers, config) {
                    $log.error('error', error);
                });
        };

        $scope.editUser = function (username) {
            var route = jsRoutes.controllers.JUsers.fetch(username);
            $http({
                'method': route.method,
                'url': route.url,
                'cache': false
            })
                .success(function (user, status, headers, config) {
                    $scope.user = user;
                });

        };


        $scope.newUser = function () {
            $scope.user = {};
        };

        $scope.saveUser = function () {
            var route = jsRoutes.controllers.JUsers.save();
            var currentUser = $scope.user;
            $http({
                'method': route.method,
                'url': route.url,
                'cache': false,
                'data': $scope.user
            })
                .success(function (result) {
                    $scope.user = {};
                    $rootScope.onSuccess("L'utilisateur " + currentUser.username + " a été sauvegardé.");
                    $scope.loadUsers();
                })
        };

        $scope.resetPwd = function (username) {
            if (window.confirm("Êtes-vous sûr de vouloir réinitialiser le mot de passe de " + username + " ?")) {
                var route = jsRoutes.controllers.JUsers.resetPwd(username);
                $http({
                    'method': route.method,
                    'url': route.url,
                    'cache': false,
                    'data': $scope.user
                })
                    .success(function (result) {
                        $rootScope.onSuccess("Le mot de passe de l'utilisateur " + username + " a été réinitialisé.");
                        $scope.user = {};
                        $scope.loadUsers();
                    });
            }
        };

        $scope.delete = function(username){
            if (window.confirm("Êtes-vous sûr de vouloir supprimer l'utilisateur " + username + " ?")) {
            var route = jsRoutes.controllers.JUsers.delete(username);
                $http({
                    'method': route.method,
                    'url': route.url,
                    'cache': false
                })
                    .success(function (result) {
                        $rootScope.onSuccess("L'utilisateur " + username + " a été supprimé.");
                        $scope.user = {};
                        $scope.loadUsers();
                    });
            }
        };

    }]);
