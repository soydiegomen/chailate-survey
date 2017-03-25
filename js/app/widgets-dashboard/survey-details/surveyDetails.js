(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard')
		.directive('surveyDetails', surveyDetails);

	function surveyDetails() {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'ctrl',
		    templateUrl: 'js/app/widgets-dashboard/survey-details/survey-details.html',
		    scope: {
		      chartData : '='
		    },
		    controller: 'SurveyDetailsCtrl'
		};

		return directive;
	}

})();