(function() {
	'use strict';

	angular.module('surveyApp.sentMessage').
		controller('SentMessageCtrl', SentMessageCtrl);


	function SentMessageCtrl(){
		var ctrl = this;
		activate();

		function activate(){
			console.log('Activated SentMessageCtrl');	
		}
	}
})();