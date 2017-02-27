( function() {
	'use strict';

	angular.module('surveyApp.home').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$routeParams','$location', 'dataservice'];

	/**@ngInject*/
	function HomeCtrl($routeParams, $location, dataservice){
		var homeCtrl = this;
		//Events
		homeCtrl.saveSurvey = saveSurvey;

		//Variables
		homeCtrl.survey = null;
		homeCtrl.initTime = new Date();

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated HomeCtrl');	
			console.log($routeParams.key);
			//TODO: Mostrar el formulario hasta que ya se haya cargado la info de la encuesta
			getChailateSurvey();
		}

		function saveSurvey(){
			var answer = buildAnswer();
			saveAnswer(answer);
		}

		function getChailateSurvey(){
			return dataservice.getChailateSurvey('58b25da09a6fffc80200000b')
				.then(function(data) {
					homeCtrl.survey = data;
					return data;
				});
		}

		function saveAnswer(answer){
			return dataservice.saveAnswer(answer)
				.then(function(data) {
					navToSuccessView();								
					return data;
				});
		}

		function navToSuccessView(){
			$location.path('/sent-message');
		}

		function buildAnswer(){
			var answer = null;

			//Survey must be exist in current context
			if(homeCtrl.survey){
				answer = {
					surveyId : homeCtrl.survey._id,
					key : '',
					usedTime : 0,
					details : []
				};
				//Set tracking key
				if($routeParams.key){
					answer.key = $routeParams.key;
				}
				//Set usedTime
				var currentDate = new Date();
				var dif = currentDate.getTime() - homeCtrl.initTime.getTime();
				answer.usedTime = Math.abs(dif /1000);

				//Set answer details
				answer.details = getAnswerDetails();
				
			}else{
				//Answer not be save but is better idea show success view to error view
				navToSuccessView();
			}

			return answer;
		}

		function getAnswerDetails(){
			var details = [];
			var questions = homeCtrl.survey.questions;

			questions.forEach(function(entry) {

				var answerDet = {
					questionId : entry._id,
					value : null
				};

				switch(entry.code)
				{
					case 'question-one':
						answerDet.value = homeCtrl.fstAnswer;
						break;
					case 'question-two':
						answerDet.value = homeCtrl.secAnswer;
						break;
					case 'question-three':
						answerDet.value = homeCtrl.thirdAnswer;
						break;
					case 'question-four':
						answerDet.value = homeCtrl.fourthAnswer;
						break;
					case 'question-five':
						answerDet.value = homeCtrl.commentsAnswer;
						break;
				}

				details.push(answerDet);
			});

			return details;
		}	
	}
})();