(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('GeneralScoreCtrl', GeneralScoreCtrl);

	GeneralScoreCtrl.$inject = ['$scope','dataservice'];

	function GeneralScoreCtrl($scope, dataservice){
		var ctrl = this;

        activate();

        function activate(){
        	console.log('Activated GeneralScoreCtrl');	
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
			var listCountAns = [];
	    	var listLabels = [];

	    	data.forEach(function(entry) {

				listCountAns.push(entry.count);
				//Set label value
				var label = (entry._id && entry._id.length) > 0 ? entry._id : 'vacía';
				listLabels.push(label);
			});
			ctrl.labels = listLabels;
  			ctrl.data = listCountAns;
  			
  			/*Use library chart.piecelabel for show label in pie chart*/
  			ctrl.options = {
			    pieceLabel: {
					mode: 'percentage',
					fontSize: 16,
					precision: 0
				},
				legend: {
		            display: true
		        }
			};
		}
	}

})();