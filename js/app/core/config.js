(function () {
	'use strict';

	var core = angular.module('surveyApp.core');

    core.constant('appConfig', 
    {
        apiBaseUrl : 'http://localhost:3000/api/',
        maxMonths : 6,
        surveyId : '58b8f349aaf9b39e0200000a',
        commentQuestion : '58b8f349aaf9b39e0200000b',
        generalScoreQue : '58b8f349aaf9b39e0200000f',
        priceQuestion : '58b8f349aaf9b39e0200000e',
        staff : '58b8f349aaf9b39e0200000d'
    });

    core.config(configure);

    //configure.$inject = ['$routeProvider', 'routehelperConfigProvider', 'locationProvider'];

    function configure ($routeProvider, routehelperConfigProvider, $locationProvider) {

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        // enable HTML5 mode as hashbang-type URLs will not work with mod_rewrite redirection
        //$locationProvider.html5Mode(true).hashPrefix('!');
    }
})();