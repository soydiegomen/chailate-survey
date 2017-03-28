(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('SurveyDetailsCtrl', SurveyDetailsCtrl);

	SurveyDetailsCtrl.$inject = ['$scope','dataservice'];

	function SurveyDetailsCtrl($scope, dataservice){
		var ctrl = this;

        activate();

        function activate(){
        	console.log('Activated SurveyDetailsCtrl');	
        	getLastAnswer().then(getChailateSurvey).then(function(data) {
        		console.log('results');
        		console.log(ctrl.answer);
        		console.log(ctrl.survey);
        	});
        }

        function getLastAnswer(){
        	var date = new Date();
			var isoDate = date.toISOString();
			return dataservice.getLastAnswer(isoDate)
				.then(function(data) {
					ctrl.answer = data;
					return data;
				});
		}

		function getChailateSurvey(){
			return dataservice.getChailateSurvey()
				.then(function(data) {
					ctrl.survey = data;
					return data;
				});
		}
	}

})();