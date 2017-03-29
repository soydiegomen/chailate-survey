(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('SurveyDetailsCtrl', SurveyDetailsCtrl);

	SurveyDetailsCtrl.$inject = ['$scope','dataservice'];

	function SurveyDetailsCtrl($scope, dataservice){
		var ctrl = this;

        activate();

        function activate(){
        	console.log('Activated SurveyDetailsCtrl');	
        	getChailateSurvey().then(getLastAnswer).then(function(result) {
        		ctrl.questions = fillAnswersInQuestions(result);

        		var answer = result.answer[0];
        		ctrl.answerDate = new Date(answer.creationDate);
        		ctrl.key = (answer.key && answer.key.length > 0) ?
        			answer.key : 'vacía';
        	});
        }

        function fillAnswersInQuestions(data){
        	var questions = data.survey.questions;
        	var answers = data.answer[0].details;
        	
        	//Iterate questions for fill the answer
        	questions.forEach(function(question) {
        		answers.forEach(function(ans) {
        			//find the answer to the current question
        			if(question._id === ans.questionId){
        				//assing the answer value
        				question.answer = ans.value;
        			}
        		});
        	});
        	console.log(data.answer[0]);
        	return questions;
        }

        function getLastAnswer(survey){
        	var date = new Date();
			var isoDate = date.toISOString();
			return dataservice.getLastAnswer(isoDate)
				.then(function(data) {
					var result = { 
						survey : survey, 
						answer : data
					};
					
					return result;
				});
		}

		function getChailateSurvey(){
			return dataservice.getChailateSurvey()
				.then(function(data) {
					return data;
				});
		}
	}

})();