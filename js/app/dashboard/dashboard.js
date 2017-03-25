(function() {
	'use strict';

	angular.module('surveyApp.dashboard').
		controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['dataservice'];

	function DashboardCtrl(dataservice){
		var ctrl = this;

		ctrl.genealQuestion = 'general-score';
		ctrl.priceQuestion = { title : 'Evaluación del precio', 
			questionType : 'price'};
		ctrl.staffQuestion = { title : 'Evaluación del personal de Chailate', 
			questionType : 'staff'};
		ctrl.recommendationQuestion = { title : 'Recomedarían los servicios de Chailate', 
			questionType : 'recommendation'};

		activate();
		
		function activate(){
			console.log('Activated Dashboard');	
		}
	}
})();