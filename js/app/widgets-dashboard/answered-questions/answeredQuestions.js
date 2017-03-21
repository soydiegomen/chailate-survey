(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard')
		.directive('answeredQuestions', answeredQuestions);

	function answeredQuestions() {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'ctrl',
		    templateUrl: 'js/app/widgets-dashboard/answered-questions/answered-questions.html',
		    scope: {
		      question : '='
		    },
		    controller: 'AnsweredQuestionsCtrl'
		};

		return directive;
	}

})();