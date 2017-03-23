(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard')
		.directive('questionResults', questionResults);

	function questionResults() {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'ctrl',
		    templateUrl: 'js/app/widgets-dashboard/question-results/question-results.html',
		    scope: {
		      chartData : '='
		    },
		    /*link: link,*/
		    controller: 'QuestionResultsCtrl'
		};

		return directive;
	}

})();