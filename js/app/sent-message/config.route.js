(function() {
	'use strict';

	angular.module('chaiApp.sentMessage').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [
			{
				url: '/sent-message',
				config: {
					templateUrl: 'js/app/sent-message/sent-message.html',
			        controller: 'SentMessageCtrl',
			        controllerAs: 'sentMessageCtrl'
				}
			}
		];
	}
})();