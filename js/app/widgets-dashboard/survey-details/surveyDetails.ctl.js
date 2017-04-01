(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('SurveyDetailsCtrl', SurveyDetailsCtrl);

	SurveyDetailsCtrl.$inject = ['$scope','dataservice'];

        function SurveyDetailsCtrl($scope, dataservice){
                var ctrl = this;
                ctrl.getBeforAnswer = getBeforAnswer;
                ctrl.getNextAnswer = getNextAnswer;
                ctrl.answerDate = null;
                ctrl.key = null;
                ctrl.survey = null;
                ctrl.showNextButton = true;
                ctrl.showBeforeButton = true;
                var firstDate = null;

                activate();

                function activate(){
                	console.log('Activated SurveyDetailsCtrl');	
                        initializeWidget();        	
                }

                function initializeWidget(){
                        getChailateSurvey().then(function(){
                                var now = new Date();
                                return getLastAnswer(now, 'before');
                        }).then(setupWidgetData);
                }

                function getNextAnswer(){
                        var lastDate = ctrl.answerDate;
                        lastDate.setSeconds(lastDate.getSeconds() + 1);
                        getLastAnswer(lastDate, 'next').then(setupWidgetData);
                }

                function getBeforAnswer(){
                        var lastDate = ctrl.answerDate;
                        lastDate.setSeconds(lastDate.getSeconds() - 1);
                        getLastAnswer(lastDate, 'before').then(setupWidgetData);
                }

                function setupWidgetData(result){
                        if(result.length > 0){
                                var answer = result[0];
                                ctrl.questions = fillAnswersInQuestions(answer);

                                ctrl.key = (answer.key && answer.key.length > 0) ?
                                        answer.key : 'vacía';

                                ctrl.answerDate = new Date(answer.creationDate);
                                if(firstDate === null || firstDate.getTime() === ctrl.answerDate.getTime()){
                                        firstDate = new Date(ctrl.answerDate.getTime());
                                        ctrl.showNextButton = false;
                                }else{
                                      ctrl.showNextButton = true;  
                                }
                                //mientras haya información siempre se muestra el botón Before
                                ctrl.showBeforeButton = true;
                        }else{
                                ctrl.showBeforeButton = false;
                        }
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

                function getLastAnswer(lastDate, direction){
                	var isoDate = lastDate.toISOString();
        		return dataservice.getLastAnswer(isoDate, direction)
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