(function () {
	'use strict';

	
	angular.module('surveyApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var surveyId = '58be316dcd51dfc20c000004';
		var service = {
			getChailateSurvey : getChailateSurvey,
			saveAnswer : saveAnswer,
			getAnswersByMonth : getAnswersByMonth
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

			var serviceUrl = 'http://localhost:3000/api/answers';
			return $http.post(serviceUrl, jsonAnswer)
				.then(saveAnswerComplete);

			function saveAnswerComplete(data, status, headers, config){
				return data.data;
			}
		}

		//Report services
		function getAnswersByMonth(){
			var serviceUrl = 'http://localhost:3000/api/ans-report/answers-by-month/' + surveyId;
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