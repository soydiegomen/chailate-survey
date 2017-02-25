(function () {
	'use strict';

	
	angular.module('surveyApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getChailateSurvey : getChailateSurvey
		};

		return service;

		function getChailateSurvey(){
			var serviceUrl = 'http://localhost:3000/api/survey/58b10ecda7ca0f700b000003';
			return $http.get(serviceUrl).then(getDesignGallComplete).catch(function (message){
				console.log('Error in getDesignGallery. Message:' + message);
			});

			function getDesignGallComplete(data, status, headers, config){
				return data.data;
			}
		}

		/*Helpers*/
		function getPortfolioService(type){
			var serviceUrl = '';
			switch(type){
				case 'design':
					serviceUrl = 'jsons/portfolio-diseno.json';
					break;
				case 'photos':
					serviceUrl = 'jsons/portfolio-photos.json';
					break;
				case 'webdev':
					serviceUrl = 'jsons/portfolio-webdev.json';
					break;
			}
			return serviceUrl;
		}
	}
})();