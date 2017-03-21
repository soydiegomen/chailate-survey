(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('surveyApp.widgetsDashboard')
		.directive('lastComments', lastComments);

	function lastComments() {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'ctrl',
		    templateUrl: 'js/app/widgets-dashboard/last-comments/last-comments.html',
		    scope: {
		      question : '='
		    },
		    controller: 'LastCommentsCtrl'
		};

		return directive;
	}

})();