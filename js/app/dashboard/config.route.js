(function () {
	'use strict';
	angular.module('surveyApp.dashboard').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/dashboard',
				config: {
					templateUrl: 'js/app/dashboard/dashboard.html',
			        controller: 'DashboardCtrl',
			        controllerAs: 'dashboardCtrl'
				}
			}
		];
	}

})();