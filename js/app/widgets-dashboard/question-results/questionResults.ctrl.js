(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('QuestionResultsCtrl', QuestionResultsCtrl);

	QuestionResultsCtrl.$inject = ['$scope','dataservice'];

	function QuestionResultsCtrl($scope, dataservice){
		var ctrl = this;
		ctrl.chGeneralScore = {};

        activate();

        function activate(){
        	console.log('Activated QuestionResultsCtrl');	
        	getGeneralScore();
        }

        /*Chart of distribution of answers*/
		function getGeneralScore(){
			return dataservice.getGroupDetails($scope.question)
				.then(function(data) {
					setupGeneralScoreChart(data);
					return data;
				});
		}

		function setupGeneralScoreChart(data){
			var chart = ctrl.chGeneralScore;
			var listCountAns = [];
	    	var listLabels = [];

	    	data.forEach(function(entry) {

				listCountAns.push(entry.count);
				listLabels.push(entry._id);
			});
			chart.labels = listLabels;
  			chart.data = listCountAns;
		}
	}

})();