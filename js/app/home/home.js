( function() {
	'use strict';

	angular.module('surveyApp.home').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$routeParams','$location', 'dataservice'];

	/**@ngInject*/
	function HomeCtrl($routeParams, $location, dataservice){
		var homeCtrl = this;
		//Events
		this.saveSurvey = saveSurvey;

		//Variables
		this.fstAnswer = '';

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated HomeCtrl');	
			console.log('All is fine!');
			getChailateSurvey();
		}

		function saveSurvey(){
			console.log(this.fstAnswer);
			console.log(this.secAnswer);
			console.log(this.thirdAnswer);
			console.log(this.fourthAnswer);
			$location.path('/sent-message');
		}

		function getChailateSurvey(){
			return dataservice.getChailateSurvey().
				then(function(data) {
					console.log(data);
					return data;
				});
		}
	}
})();