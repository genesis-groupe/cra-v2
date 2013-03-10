app.controller('ClaimCtrl', ['$scope', '$rootScope', '$http', '$log', '$location', 'ClaimTypeConst', 'MonthsConst', 'profile',
	function ClaimCtrl($scope, $rootScope, $http, $log, $location, ClaimTypeConst, MonthsConst, profile) {
		var Claim = function(username, form) {
			return {
				username: username,
				missionId: form.missionId,
				date: moment(form.date, 'DD/MM/YYYY').valueOf(),
				claimType: form.claimType,
				amount: form.amount,
				kilometer: form.kilometer,
				journey: form.journey,
				comment: form.comment
			}
		};

		$scope.profile = profile.data;

		/* Form */
		$scope.form = {};
		$scope.missions = [];

		$scope.loadRefs = function() {
			var route = jsRoutes.controllers.JMissions.claims($scope.profile.username);
			$http({
				'method': route.method,
				'url': route.url,
				'cache': false
			})
				.success(function(missions, status, headers, config) {
					$scope.missions = _($scope.missions)
						.push(missions)
						.flatten()
						.valueOf();
				})
				.error(function(error, status, headers, config) {
				});
		};

		$scope.save = function() {
			var claim = new Claim($scope.profile.username, $scope.form);
			var route = jsRoutes.controllers.JClaims.create();
			$http({
				'method': route.method,
				'url': route.url,
				'cache': false,
				'data': claim
			})
				.success(function(claim, status, headers, config) {
					$rootScope.onSuccess("La note de frais a été créée.");
					$scope.loadHistory();
				})
				.error(function(error, status, headers, config) {
				});
		};

		$scope.delete = function(id) {
			var route = jsRoutes.controllers.JClaims.delete(id);
			$http({
				'method': route.method,
				'url': route.url,
				'cache': false
			})
				.success(function(claims, status, headers, config) {
					$scope.loadHistory();
				})
				.error(function(error, status, headers, config) {
				});
		};

		/* History */
		$scope.history = [];
		$scope.months = _(MonthsConst).flatten().valueOf();
		$scope.claimsType = ClaimTypeConst;
		$scope.sortBys = [
			{'key': '+date', 'label': 'Date (asc)'},
			{'key': '-date', 'label': 'Date (desc)'},
			{'key': '+claimType', 'label': 'Type (asc)'},
			{'key': '-claimType', 'label': 'Type (desc)'}
		];
		$scope.filter = {
			'year': moment().year(),
			'month': $scope.months[moment().month()].id,
			'sortBy': $scope.sortBys[0].key
		};

		$scope.filterChange = function() {
			if($scope.filter.year && $scope.filter.month) {
				$scope.loadHistory();
			}
		};

		$scope.sortByChange = function() {
			$scope.history = sort($scope.history);
		};

		var sort = function(list) {
			var field = $scope.filter.sortBy.substr(1),
				direction = $scope.filter.sortBy.substr(0, 1) === '+' ? 'asc' : 'desc',
				result = _(list)
					.sortBy(field);
			if(direction === 'desc') {
				result.reverse();
			}
			return result.valueOf();
		};

		$scope.loadHistory = function() {
			var route = jsRoutes.controllers.JClaims.history($scope.profile.username, $scope.filter.year, $scope.filter.month);
			$http({
				'method': route.method,
				'url': route.url,
				'cache': false
			})
				.success(function(history, status, headers, config) {
					$scope.history = sort(history);
					$log.debug($scope.history);
				})
				.error(function(error, status, headers, config) {
					$log.error('error', error);
				});
		};

	}]);
