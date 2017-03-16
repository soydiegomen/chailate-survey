(function() {
	'use strict';

	angular.module('surveyApp.dashboard').
		controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['dataservice'];

	function DashboardCtrl(dataservice){
		var ctrl = this;

		//Variables
		ctrl.chAnsByMo = {};

		activate();
		
		function activate(){
			console.log('Activated Dashboard');	
			getAnswersByMonth();
		}

		function getAnswersByMonth(){
			return dataservice.getAnswersByMonth('58b8f349aaf9b39e0200000a')
				.then(function(data) {
					setupColumnChart(data);
					return data;
				});
		}

		function setupColumnChart(answers){
			var chartData = [];
			var listCountAns = [];
	    	var listMonthLabels = [];

	    	answers.forEach(function(entry) {

				listCountAns.push(entry.count);
				listMonthLabels.push(entry._id.month + '-' + entry._id.year);
			});
			chartData.push(listCountAns);

			var chart = ctrl.chAnsByMo;
		    chart.labels = listMonthLabels;
			chart.series = ['Series A'];


			chart.data = chartData;
			chart.colors = ['#ff6384'];

			chart.options = {
			    scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero: true
			            }
			        }]
			    }
			};
		}
	}
})();