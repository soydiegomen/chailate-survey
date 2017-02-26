(function () {
	'use strict';

	
	angular.module('surveyApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getChailateSurvey : getChailateSurvey,
			saveAnswer : saveAnswer
		};

		return service;

		function getChailateSurvey(surveyid){
			var serviceUrl = 'http://localhost:3000/api/survey/' + surveyid;
			return $http.get(serviceUrl)
				.then(getSurveyComplete)
				.catch(function (message){
					console.log('Error in getChailateSurvey. Message:' + message);
				});

			function getSurveyComplete(data, status, headers, config){
				return data.data;
			}
		}

		function saveAnswer(answer){
			var jsonAnswer = JSON.stringify(answer);
			console.log(jsonAnswer);

			var serviceUrl = 'http://localhost:3000/api/answers';
			return $http.post(serviceUrl, jsonAnswer)
				.then(saveAnswerComplete)
				.catch(function (message){
					console.log('Error in saveAnswer. Message:' + message);
				});

			function saveAnswerComplete(data, status, headers, config){
				return data.data;
			}
		}
	}
})();