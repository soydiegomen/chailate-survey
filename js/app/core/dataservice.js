(function () {
	'use strict';

	
	angular.module('surveyApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getChailateSurvey : getChailateSurvey,
			saveAnswer : saveAnswer,
			getAnswersByMonth : getAnswersByMonth,
			getLastComments : getLastComments,
			getGroupDetails : getGroupDetails,
			getLastAnswer : getLastAnswer
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
			var serviceUrl = appConfig.apiBaseUrl + 'ans-report/answers-by-month/' + 
				appConfig.surveyId + '/' + appConfig.maxMonths;

			return $http.get(serviceUrl)
				.then(getAnswersComplete)
				.catch(function (message){
					console.log('Error in getAnswersByMonth. Message:' + message);
				});

			function getAnswersComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getLastComments(){
			var serviceUrl = appConfig.apiBaseUrl + 'ans-report/get-details/' + 
				appConfig.surveyId + '/' + appConfig.commentQuestion + '/' + appConfig.maxMonths;

			return $http.get(serviceUrl)
				.then(getLastCommentsComplete)
				.catch(function (message){
					console.log('Error in getLastComments. Message:' + message);
				});

			function getLastCommentsComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getGroupDetails(question){
			var questionId = getQuestionId(question);
			var serviceUrl = appConfig.apiBaseUrl + 'ans-report/group-details-by-values/' + 
				appConfig.surveyId + '/' + questionId + '/' + appConfig.maxMonths;

			return $http.get(serviceUrl)
				.then(getGroupDetailsComplete)
				.catch(function (message){
					console.log('Error in getLastComments. Message:' + message);
				});

			function getGroupDetailsComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getLastAnswer(date, direction){
			
			var serviceUrl = appConfig.apiBaseUrl + 'last-answer/' + 
				appConfig.surveyId + '/' + date + '/' + direction;

			return $http.get(serviceUrl)
				.then(getLastAnswerComplete)
				.catch(function (message){
					console.log('Error in getLastAnswer. Message:' + message);
				});

			function getLastAnswerComplete(data, status, headers, config){
				return data.data;
			}
		}

		/*Helpers*/
		function getQuestionId(question){
			var questionId = '';

			switch(question){
				case 'general-score':
					questionId = appConfig.generalScoreQue;
					break;
				case 'price':
					questionId = appConfig.priceQuestion;
					break;
				case 'staff':
					questionId = appConfig.staffQuestion;
					break;
				case 'recommendation':
					questionId = appConfig.recommendationQuestion;
					break;
			}

			return questionId;
		}
	}
})();