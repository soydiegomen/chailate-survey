(function() {
	'use strict';

	angular.module('surveyApp.dashboard').
		controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['dataservice'];

	function DashboardCtrl(dataservice){
		var ctrl = this;

		ctrl.questionGeneral = 'general-score';

		activate();
		
		function activate(){
			console.log('Activated Dashboard');	
		}
	}
})();