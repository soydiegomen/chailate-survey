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
        }
	}

})();