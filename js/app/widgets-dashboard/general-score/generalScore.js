(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard')
		.directive('generalScore', generalScore);

	function generalScore() {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'ctrl',
		    templateUrl: 'js/app/widgets-dashboard/general-score/general-score.html',
		    scope: {
		      question : '='
		    },
		    controller: 'GeneralScoreCtrl'
		};

		return directive;
	}

})();