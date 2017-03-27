(function(){
	'use strict';

	angular.module('surveyApp.widgetsDashboard')
		.controller('LastCommentsCtrl', LastCommentsCtrl);

	LastCommentsCtrl.$inject = ['$scope','dataservice'];

	function LastCommentsCtrl($scope, dataservice){
		var ctrl = this;
		ctrl.lastComments = [];
		ctrl.today = new Date();

        activate();

        function activate(){
        	console.log('Activated LastCommentsCtrl');	
        	getLastComments();
        }

        /*Comments in the last months*/
		function getLastComments(){
			return dataservice.getLastComments()
				.then(function(data) {
					data.forEach(function(entry) {
						entry.creationDate = new Date(entry.creationDate);
					});
					ctrl.lastComments = data;
					return data;
				});
		}
	}

})();