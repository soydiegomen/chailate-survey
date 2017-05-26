!function(){"use strict";angular.module("chaiApp",["surveyApp.core","surveyApp.widgets","surveyApp.widgetsDashboard","surveyApp.home","surveyApp.sentMessage","surveyApp.dashboard"])}();
!function(){"use strict";angular.module("blocks.router",["ngRoute"])}();
!function(){"use strict";angular.module("surveyApp.core",["ngRoute","blocks.router"])}();
!function(){"use strict";angular.module("surveyApp.dashboard",["chart.js"])}();
!function(){"use strict";angular.module("surveyApp.home",[])}();
!function(){"use strict";angular.module("surveyApp.sentMessage",[])}();
!function(){"use strict";angular.module("surveyApp.widgetsDashboard",[])}();
!function(){"use strict";angular.module("surveyApp.widgets",[])}();
!function(){"use strict";function routehelperConfig(){this.config={},this.$get=function(){return{config:this.config}}}function routehelper($location,$rootScope,$route,routehelperConfig){function configureRoutes(routes){routes.forEach(function(route){route.config.resolve=angular.extend(route.config.resolve||{},routehelperConfig.config.resolveAlways),$routeProvider.when(route.url,route.config)}),$routeProvider.otherwise({redirectTo:"/"})}function handleRoutingErrors(){$rootScope.$on("$routeChangeError",function(event,current,previous,rejection){if(!handlingRouteChangeError){routeCounts.errors++,handlingRouteChangeError=!0;var destination=current&&(current.title||current.name||current.loadedTemplateUrl)||"unknown target";"Error routing to "+destination+". "+(rejection.msg||"");$location.path("/")}})}function init(){handleRoutingErrors(),updateDocTitle()}function getRoutes(){for(var prop in $route.routes)if($route.routes.hasOwnProperty(prop)){var route=$route.routes[prop],isRoute=!!route.title;isRoute&&routes.push(route)}return routes}function updateDocTitle(){$rootScope.$on("$routeChangeSuccess",function(event,current,previous){routeCounts.changes++,handlingRouteChangeError=!1;var title=routehelperConfig.config.docTitle+" "+(current.title||"");$rootScope.title=title})}var handlingRouteChangeError=!1,routeCounts={errors:0,changes:0},routes=[],$routeProvider=routehelperConfig.config.$routeProvider,service={configureRoutes:configureRoutes,getRoutes:getRoutes,routeCounts:routeCounts};return init(),service}angular.module("blocks.router").provider("routehelperConfig",routehelperConfig).factory("routehelper",routehelper),routehelper.$inject=["$location","$rootScope","$route","routehelperConfig"]}();
!function(){"use strict";function analyticsservice($http,appConfig,$window,$location){function trackPageView(){$window.ga?$window.ga("send","pageview",{page:$location.url()}):reportAnalyticsOff()}function trackEvent(category,action,info){$window.ga?$window.ga("send",{hitType:"event",eventCategory:category,eventAction:action,eventLabel:info}):reportAnalyticsOff()}function reportAnalyticsOff(){console.log("GOOGLE ANALYTICS IS OFF")}var service={trackPageView:trackPageView,trackEvent:trackEvent};return service}angular.module("surveyApp.core").factory("analyticsservice",analyticsservice),analyticsservice.$inject=["$http","appConfig","$window","$location"]}();
!function(){"use strict";function configure($routeProvider,routehelperConfigProvider,$locationProvider){routehelperConfigProvider.config.$routeProvider=$routeProvider,routehelperConfigProvider.config.docTitle="NG-Modular: "}var core=angular.module("surveyApp.core");core.constant("appConfig",{apiBaseUrl:"http://138.197.206.181/api/",maxMonths:6,surveyId:"59279aa0a8d5b8ac41000004",commentQuestion:"59279aa0a8d5b8ac41000005",generalScoreQue:"59279aa0a8d5b8ac41000009",priceQuestion:"59279aa0a8d5b8ac41000008",staffQuestion:"59279aa0a8d5b8ac41000007",recommendationQuestion:"59279aa0a8d5b8ac41000006"}),core.config(configure)}();
!function(){"use strict";function dataservice($http,appConfig){function getChailateSurvey(){function getSurveyComplete(data,status,headers,config){return data.data}var serviceUrl=appConfig.apiBaseUrl+"survey/"+appConfig.surveyId;return $http.get(serviceUrl).then(getSurveyComplete).catch(function(message){console.log("Error in getChailateSurvey. Message:"+message)})}function saveAnswer(answer){function saveAnswerComplete(data,status,headers,config){return data.data}var jsonAnswer=JSON.stringify(answer),serviceUrl=appConfig.apiBaseUrl+"answers";return $http.post(serviceUrl,jsonAnswer).then(saveAnswerComplete)}function getAnswersByMonth(){function getAnswersComplete(data,status,headers,config){return data.data}var serviceUrl=appConfig.apiBaseUrl+"ans-report/answers-by-month/"+appConfig.surveyId+"/"+appConfig.maxMonths;return $http.get(serviceUrl).then(getAnswersComplete).catch(function(message){console.log("Error in getAnswersByMonth. Message:"+message)})}function getLastComments(){function getLastCommentsComplete(data,status,headers,config){return data.data}var serviceUrl=appConfig.apiBaseUrl+"ans-report/get-details/"+appConfig.surveyId+"/"+appConfig.commentQuestion+"/"+appConfig.maxMonths;return $http.get(serviceUrl).then(getLastCommentsComplete).catch(function(message){console.log("Error in getLastComments. Message:"+message)})}function getGroupDetails(question){function getGroupDetailsComplete(data,status,headers,config){return data.data}var questionId=getQuestionId(question),serviceUrl=appConfig.apiBaseUrl+"ans-report/group-details-by-values/"+appConfig.surveyId+"/"+questionId+"/"+appConfig.maxMonths;return $http.get(serviceUrl).then(getGroupDetailsComplete).catch(function(message){console.log("Error in getLastComments. Message:"+message)})}function getLastAnswer(date,direction){function getLastAnswerComplete(data,status,headers,config){return data.data}var serviceUrl=appConfig.apiBaseUrl+"last-answer/"+appConfig.surveyId+"/"+date+"/"+direction;return $http.get(serviceUrl).then(getLastAnswerComplete).catch(function(message){console.log("Error in getLastAnswer. Message:"+message)})}function getQuestionId(question){var questionId="";switch(question){case"general-score":questionId=appConfig.generalScoreQue;break;case"price":questionId=appConfig.priceQuestion;break;case"staff":questionId=appConfig.staffQuestion;break;case"recommendation":questionId=appConfig.recommendationQuestion}return questionId}var service={getChailateSurvey:getChailateSurvey,saveAnswer:saveAnswer,getAnswersByMonth:getAnswersByMonth,getLastComments:getLastComments,getGroupDetails:getGroupDetails,getLastAnswer:getLastAnswer};return service}angular.module("surveyApp.core").factory("dataservice",dataservice),dataservice.$inject=["$http","appConfig"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/dashboard",config:{templateUrl:"js/app/dashboard/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboardCtrl"}}]}angular.module("surveyApp.dashboard").run(appRun)}();
!function(){"use strict";function DashboardCtrl(dataservice){function activate(){console.log("Activated Dashboard")}var ctrl=this;ctrl.genealQuestion="general-score",ctrl.priceQuestion={title:"Evaluación del precio",questionType:"price"},ctrl.staffQuestion={title:"Evaluación del personal de Chailate",questionType:"staff"},ctrl.recommendationQuestion={title:"Recomedarían los servicios de Chailate",questionType:"recommendation"},activate()}angular.module("surveyApp.dashboard").controller("DashboardCtrl",DashboardCtrl),DashboardCtrl.$inject=["dataservice"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/",config:{templateUrl:"js/app/home/home.html",controller:"HomeCtrl",controllerAs:"homeCtrl"}},{url:"/servicio/:key?",config:{templateUrl:"js/app/home/home.html",controller:"HomeCtrl",controllerAs:"homeCtrl"}}]}angular.module("surveyApp.home").run(appRun)}();
!function(){"use strict";function HomeCtrl($routeParams,$location,dataservice){function activate(){console.log("Activated HomeCtrl"),console.log($routeParams.key),getChailateSurvey()}function saveSurvey(){var answer=buildAnswer();null!==answer?saveAnswer(answer).then(function(data){return navToSuccessView(),data}).catch(function(message){console.log("Error in saveSurvey: "+message),navToSuccessView()}):navToSuccessView()}function getChailateSurvey(){return dataservice.getChailateSurvey().then(function(data){return homeCtrl.survey=data,data})}function saveAnswer(answer){return dataservice.saveAnswer(answer)}function navToSuccessView(){$location.path("/sent-message")}function buildAnswer(){var answer=null;if(homeCtrl.survey){answer={surveyId:homeCtrl.survey._id,key:"",usedTime:0,details:[]},$routeParams.key&&(answer.key=$routeParams.key);var currentDate=new Date,dif=currentDate.getTime()-homeCtrl.initTime.getTime();answer.usedTime=Math.abs(dif/1e3),answer.details=getAnswerDetails()}return answer}function getAnswerDetails(){var details=[],questions=homeCtrl.survey.questions;return questions.forEach(function(entry){var answerDet={questionId:entry._id,value:null};switch(entry.code){case"question-one":answerDet.value=homeCtrl.fstAnswer;break;case"question-two":answerDet.value=homeCtrl.secAnswer;break;case"question-three":answerDet.value=homeCtrl.thirdAnswer;break;case"question-four":answerDet.value=homeCtrl.fourthAnswer;break;case"question-five":answerDet.value=homeCtrl.commentsAnswer}details.push(answerDet)}),details}var homeCtrl=this;homeCtrl.saveSurvey=saveSurvey,homeCtrl.survey=null,homeCtrl.initTime=new Date,homeCtrl.fstAnswer="",homeCtrl.secAnswer="",homeCtrl.thirdAnswer="",homeCtrl.fourthAnswer="",homeCtrl.commentsAnswer="",activate()}angular.module("surveyApp.home").controller("HomeCtrl",HomeCtrl),HomeCtrl.$inject=["$routeParams","$location","dataservice"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/sent-message",config:{templateUrl:"js/app/sent-message/sent-message.html",controller:"SentMessageCtrl",controllerAs:"sentMessageCtrl"}}]}angular.module("surveyApp.sentMessage").run(appRun)}();
!function(){"use strict";function SentMessageCtrl(){function activate(){console.log("Activated SentMessageCtrl")}activate()}angular.module("surveyApp.sentMessage").controller("SentMessageCtrl",SentMessageCtrl)}();
!function(){"use strict";function AnsweredQuestionsCtrl($scope,dataservice){function activate(){console.log("Activated AnsweredQuestionsCtrl"),getAnswersByMonth()}function getAnswersByMonth(){return dataservice.getAnswersByMonth().then(function(data){return setupColumnChart(data),data})}function setupColumnChart(answers){var chart=ctrl.chAnsByMo,chartData=[],listCountAns=[],listMonthLabels=[];answers.forEach(function(entry){listCountAns.push(entry.count),listMonthLabels.push(entry._id.month+"-"+entry._id.year)}),chartData.push(listCountAns),chart.data=chartData,chart.labels=listMonthLabels,chart.series=["Encuestas"],chart.options={scales:{yAxes:[{ticks:{beginAtZero:!0,stepSize:1}}]}}}var ctrl=this;ctrl.chartColors=["#ff6384"],ctrl.chAnsByMo={},activate()}angular.module("surveyApp.widgetsDashboard").controller("AnsweredQuestionsCtrl",AnsweredQuestionsCtrl),AnsweredQuestionsCtrl.$inject=["$scope","dataservice"]}();
!function(){"use strict";function answeredQuestions(){var directive={restrict:"EA",controllerAs:"ctrl",templateUrl:"js/app/widgets-dashboard/answered-questions/answered-questions.html",scope:{question:"="},controller:"AnsweredQuestionsCtrl"};return directive}angular.module("surveyApp.widgetsDashboard").directive("answeredQuestions",answeredQuestions)}();
!function(){"use strict";function GeneralScoreCtrl($scope,dataservice){function activate(){console.log("Activated GeneralScoreCtrl"),getGeneralScore()}function getGeneralScore(){return dataservice.getGroupDetails($scope.question).then(function(data){return setupGeneralScoreChart(data),data})}function setupGeneralScoreChart(data){var listCountAns=[],listLabels=[];data.forEach(function(entry){listCountAns.push(entry.count);var label=(entry._id&&entry._id.length)>0?entry._id:"vacía";listLabels.push(label)}),ctrl.labels=listLabels,ctrl.data=listCountAns,ctrl.options={pieceLabel:{mode:"percentage",fontSize:16,precision:0},legend:{display:!0}}}var ctrl=this;activate()}angular.module("surveyApp.widgetsDashboard").controller("GeneralScoreCtrl",GeneralScoreCtrl),GeneralScoreCtrl.$inject=["$scope","dataservice"]}();
!function(){"use strict";function generalScore(){var directive={restrict:"EA",controllerAs:"ctrl",templateUrl:"js/app/widgets-dashboard/general-score/general-score.html",scope:{question:"="},controller:"GeneralScoreCtrl"};return directive}angular.module("surveyApp.widgetsDashboard").directive("generalScore",generalScore)}();
!function(){"use strict";function LastCommentsCtrl($scope,dataservice){function activate(){console.log("Activated LastCommentsCtrl"),getLastComments()}function getLastComments(){return dataservice.getLastComments().then(function(data){return data.forEach(function(entry){entry.creationDate=new Date(entry.creationDate)}),ctrl.lastComments=data,data})}var ctrl=this;ctrl.lastComments=[],ctrl.today=new Date,activate()}angular.module("surveyApp.widgetsDashboard").controller("LastCommentsCtrl",LastCommentsCtrl),LastCommentsCtrl.$inject=["$scope","dataservice"]}();
!function(){"use strict";function lastComments(){var directive={restrict:"EA",controllerAs:"ctrl",templateUrl:"js/app/widgets-dashboard/last-comments/last-comments.html",scope:{question:"="},controller:"LastCommentsCtrl"};return directive}angular.module("surveyApp.widgetsDashboard").directive("lastComments",lastComments)}();
!function(){"use strict";function QuestionResultsCtrl($scope,dataservice){function activate(){console.log("Activated QuestionResultsCtrl"),getChartData()}function getChartData(){return dataservice.getGroupDetails($scope.chartData.questionType).then(function(data){return setupChart(data),data})}function setupChart(data){var listCountAns=[],listLabels=[];data.forEach(function(entry){listCountAns.push(entry.count);var label=(entry._id&&entry._id.length)>0?entry._id:"vacía";listLabels.push(label)}),ctrl.labels=listLabels,ctrl.data=listCountAns,ctrl.options={pieceLabel:{mode:"percentage",fontSize:16,precision:0},legend:{display:!0}}}var ctrl=this;activate()}angular.module("surveyApp.widgetsDashboard").controller("QuestionResultsCtrl",QuestionResultsCtrl),QuestionResultsCtrl.$inject=["$scope","dataservice"]}();
!function(){"use strict";function questionResults(){var directive={restrict:"EA",controllerAs:"ctrl",templateUrl:"js/app/widgets-dashboard/question-results/question-results.html",scope:{chartData:"="},controller:"QuestionResultsCtrl"};return directive}angular.module("surveyApp.widgetsDashboard").directive("questionResults",questionResults)}();
!function(){"use strict";function SurveyDetailsCtrl($scope,dataservice){function activate(){console.log("Activated SurveyDetailsCtrl"),initializeWidget()}function initializeWidget(){getChailateSurvey().then(function(){var now=new Date;return getLastAnswer(now,"before")}).then(setupWidgetData)}function getNextAnswer(){var lastDate=ctrl.answerDate;lastDate.setSeconds(lastDate.getSeconds()+1),getLastAnswer(lastDate,"next").then(setupWidgetData)}function getBeforAnswer(){var lastDate=ctrl.answerDate;lastDate.setSeconds(lastDate.getSeconds()-1),getLastAnswer(lastDate,"before").then(setupWidgetData)}function setupWidgetData(result){if(result.length>0){var answer=result[0];ctrl.questions=fillAnswersInQuestions(answer),ctrl.key=answer.key&&answer.key.length>0?answer.key:"vacía",ctrl.answerDate=new Date(answer.creationDate),null===firstDate||firstDate.getTime()===ctrl.answerDate.getTime()?(firstDate=new Date(ctrl.answerDate.getTime()),ctrl.showNextButton=!1):ctrl.showNextButton=!0,ctrl.showBeforeButton=!0}else ctrl.showBeforeButton=!1}function fillAnswersInQuestions(answer){var questions=ctrl.survey.questions,ansDetails=answer.details;return questions.forEach(function(question){ansDetails.forEach(function(ans){question._id===ans.questionId&&(question.answer=ans.value)})}),questions}function getLastAnswer(lastDate,direction){var isoDate=lastDate.toISOString();return dataservice.getLastAnswer(isoDate,direction).then(function(data){return data})}function getChailateSurvey(){return dataservice.getChailateSurvey().then(function(data){return ctrl.survey=data,data})}var ctrl=this;ctrl.getBeforAnswer=getBeforAnswer,ctrl.getNextAnswer=getNextAnswer,ctrl.answerDate=null,ctrl.key=null,ctrl.survey=null,ctrl.showNextButton=!0,ctrl.showBeforeButton=!0;var firstDate=null;activate()}angular.module("surveyApp.widgetsDashboard").controller("SurveyDetailsCtrl",SurveyDetailsCtrl),SurveyDetailsCtrl.$inject=["$scope","dataservice"]}();
!function(){"use strict";function surveyDetails(){var directive={restrict:"EA",controllerAs:"ctrl",templateUrl:"js/app/widgets-dashboard/survey-details/survey-details.html",scope:{chartData:"="},controller:"SurveyDetailsCtrl"};return directive}angular.module("surveyApp.widgetsDashboard").directive("surveyDetails",surveyDetails)}();
!function(){"use strict";function loadingIndicator($rootScope){var htmlTemplate='<div class="container" ng-if="isRouteLoading"><div class="row"><div class="col-md-12 text-center"><h1 class="loading-indicator">Cargando ... <i class="fa fa-cog fa-spin"></i></h1></div></div></div>',directive={restrict:"EA",template:htmlTemplate,link:function(scope,elem,attrs){scope.isRouteLoading=!1,$rootScope.$on("$routeChangeStart",function(){scope.isRouteLoading=!0}),$rootScope.$on("$routeChangeSuccess",function(){scope.isRouteLoading=!1})}};return directive}angular.module("surveyApp.widgets").directive("loadingIndicator",loadingIndicator),loadingIndicator.$inject=["$rootScope"]}();