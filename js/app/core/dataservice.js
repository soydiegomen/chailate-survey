(function () {
	'use strict';

	
	angular.module('surveyApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getChailateSurvey : getChailateSurvey,
			saveAnswer : saveAnswer,
			getAnswersByMonth : getAnswersByMonth
		};

		return service;

		function getChailateSurvey(){
			var serviceUrl = appConfig.apiBaseUrl + 'survey/' + appConfig.surveyId;
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

			var serviceUrl = appConfig.apiBaseUrl + 'answers';
			return $http.post(serviceUrl, jsonAnswer)
				.then(saveAnswerComplete);

			function saveAnswerComplete(data, status, headers, config){
				return data.data;
			}
		}

		//Report services
		function getAnswersByMonth(){
			var serviceUrl = appConfig.apiBaseUrl + 'ans-report/answers-by-month/' + appConfig.surveyId;
			return $http.get(serviceUrl)
				.then(getAnswersComplete)
				.catch(function (message){
					console.log('Error in getAnswersByMonth. Message:' + message);
				});

			function getAnswersComplete(data, status, headers, config){
				return data.data;
			}
		}
	}
})();