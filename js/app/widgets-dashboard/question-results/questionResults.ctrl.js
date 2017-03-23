(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('QuestionResultsCtrl', QuestionResultsCtrl);

	QuestionResultsCtrl.$inject = ['$scope','dataservice'];

	function QuestionResultsCtrl($scope, dataservice){
		var ctrl = this;

        activate();

        function activate(){
        	console.log('Activated QuestionResultsCtrl');	
        	getChartData();
        }

        /*Chart of distribution of answers*/
		function getChartData(){
			return dataservice.getGroupDetails($scope.chartData.questionType)
				.then(function(data) {
					setupChart(data);
					return data;
				});
		}

		function setupChart(data){
			var listCountAns = [];
	    	var listLabels = [];

	    	data.forEach(function(entry) {

				listCountAns.push(entry.count);
				listLabels.push(entry._id);
			});
			ctrl.labels = listLabels;
  			ctrl.data = listCountAns;
  			
  			/*Use library chart.piecelabel for show label in pie chart*/
  			ctrl.options = {
			    pieceLabel: {
					mode: 'label',
					fontSize: 16,
				}
			};
		}
	}

})();