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
        staffQuestion : '58b8f349aaf9b39e0200000d',
        recommendationQuestion : '58b8f349aaf9b39e0200000c'
    });

    /*
    core.constant('appConfig', 
    {
        maxMonths : 6,
        surveyId : '59279aa0a8d5b8ac41000004',
        commentQuestion : '59279aa0a8d5b8ac41000005',
        generalScoreQue : '59279aa0a8d5b8ac41000009',
        priceQuestion : '59279aa0a8d5b8ac41000008',
        staffQuestion : '59279aa0a8d5b8ac41000007',
        recommendationQuestion : '59279aa0a8d5b8ac41000006'
    });
    */

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