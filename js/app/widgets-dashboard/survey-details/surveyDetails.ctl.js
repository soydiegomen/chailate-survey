(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('SurveyDetailsCtrl', SurveyDetailsCtrl);

	SurveyDetailsCtrl.$inject = ['$scope','dataservice'];

        function SurveyDetailsCtrl($scope, dataservice){
                var ctrl = this;
                ctrl.getABeforAnswer = getABeforAnswer;

                activate();

                function activate(){
                	console.log('Activated SurveyDetailsCtrl');	
                        getSurveyAndAnswer();        	
                }

                function getABeforAnswer(){
                        console.log('update data');
                        var lastDate = ctrl.answerDate;
                        lastDate.setSeconds(lastDate.getSeconds() - 1);
                        getLastAnswer(null, lastDate).then(setupWidgetData);
                }

                function setupWidgetData(result){
                        var answer = result[0];
                        ctrl.questions = fillAnswersInQuestions(answer);

                        
                        ctrl.answerDate = new Date(answer.creationDate);
                        ctrl.key = (answer.key && answer.key.length > 0) ?
                                answer.key : 'vacía';
                }

                function getSurveyAndAnswer(){
                        getChailateSurvey().then(getLastAnswer).then(setupWidgetData);
                }

                function fillAnswersInQuestions(answer){
                	var questions = ctrl.survey.questions;
                	var ansDetails = answer.details;
                	
                	//Iterate questions for fill the answer
                	questions.forEach(function(question) {
                		ansDetails.forEach(function(ans) {
                			//find the answer to the current question
                			if(question._id === ans.questionId){
                				//assing the answer value
                				question.answer = ans.value;
                			}
                		});
                	});
                	
                	return questions;
                }

                function getLastAnswer(survey, lastDate){
                        if(!lastDate){
                                lastDate = new Date();
                        }
                	console.log(lastDate);
                	var isoDate = lastDate.toISOString();
        		return dataservice.getLastAnswer(isoDate)
        			.then(function(data) {
        				
        				return data;
        			});
                }

                function getChailateSurvey(){
        		return dataservice.getChailateSurvey()
        			.then(function(data) {
                                        ctrl.survey = data;
        				return data;
        			});
                }
	}

})();