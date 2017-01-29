(function() {
	'use strict';

	angular.module('chaiApp.sentMessage').
		controller('SentMessageCtrl', SentMessageCtrl);


	function SentMessageCtrl(){
		var ctrl = this;
		activate();

		function activate(){
			console.log('Activated SentMessageCtrl');	
		}
	}
})();