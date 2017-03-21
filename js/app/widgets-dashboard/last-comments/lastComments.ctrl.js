(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('LastCommentsCtrl', LastCommentsCtrl);

	LastCommentsCtrl.$inject = ['$scope','dataservice'];

	function LastCommentsCtrl($scope, dataservice){
		var ctrl = this;
		ctrl.lastComments = [];

        activate();

        function activate(){
        	console.log('Activated LastCommentsCtrl');	
        	getLastComments();
        }

        /*Comments in the last months*/
		function getLastComments(){
			return dataservice.getLastComments()
				.then(function(data) {
					ctrl.lastComments = data;
					return data;
				});
		}
	}

})();