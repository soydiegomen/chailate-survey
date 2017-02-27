(function () {
	'use strict';
	angular.module('surveyApp.home').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/',
				config: {
					templateUrl: 'js/app/home/home.html',
			        controller: 'HomeCtrl',
			        controllerAs: 'homeCtrl'
				}
			},
			{
				//this url is for recibe key to tracking in the survey
				url: '/servicio/:key?',
				config: {
					templateUrl: 'js/app/home/home.html',
			        controller: 'HomeCtrl',
			        controllerAs: 'homeCtrl'
				}
			}
		];
	}

})();