(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard').directive('questionResults', questionResults);

	questionResults.$inject = ['dataservice'];

	function questionResults(dataservice) {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'vm',
		    templateUrl: 'js/app/widgets-dashboard/question-results/question-results.html',
		    scope: {
		      question : '='
		    },
		    /*link: link,*/
		    controller: 'QuestionResultsCtrl'
		};

		return directive;
	}

})();