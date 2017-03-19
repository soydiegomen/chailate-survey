(function() {
	'use strict';

	angular.module('surveyApp.dashboard').
		controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['dataservice'];

	function DashboardCtrl(dataservice){
		var ctrl = this;

		//Variables		
		ctrl.chartColors = ['#ff6384'];
		ctrl.chAnsByMo = {};
		ctrl.lastComments = [];
		ctrl.questionGeneral = 'general-score';

		activate();
		
		function activate(){
			console.log('Activated Dashboard');	
			getAnswersByMonth();
			getLastComments();
		}

		/*Comments in the last months*/
		function getLastComments(){
			return dataservice.getLastComments()
				.then(function(data) {
					ctrl.lastComments = data;
					return data;
				});
		}

		/*Surveys answers in the last months*/
		function getAnswersByMonth(){
			return dataservice.getAnswersByMonth()
				.then(function(data) {
					setupColumnChart(data);
					return data;
				});
		}

		function setupColumnChart(answers){
			var chart = ctrl.chAnsByMo;
			var chartData = [];
			var listCountAns = [];
	    	var listMonthLabels = [];

	    	answers.forEach(function(entry) {

				listCountAns.push(entry.count);
				listMonthLabels.push(entry._id.month + '-' + entry._id.year);
			});
			chartData.push(listCountAns);
			//Define chart data
			chart.data = chartData;			

		    chart.labels = listMonthLabels;
			chart.series = ['Encuestas'];

			chart.options = {
			    scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero: true,
			                stepSize: 1
			            }
			        }]
			    }
			};
		}
	}
})();