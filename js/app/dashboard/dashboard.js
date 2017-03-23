(function() {
	'use strict';

	angular.module('surveyApp.dashboard').
		controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['dataservice'];

	function DashboardCtrl(dataservice){
		var ctrl = this;

		ctrl.questionGeneral = 'general-score';
		ctrl.priceQuestion = { title : 'Evaluación del precio', questionType : 'price'};
		ctrl.staffQuestion = { title : 'Evaluación del personal de Chailate', questionType : 'staff'};

		activate();
		
		function activate(){
			console.log('Activated Dashboard');	
		}
	}
})();