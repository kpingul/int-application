(function() {
	'use strict';
	angular.module('iNeedTreez')
		.factory('AuthInterceptor', AuthInterceptor);

		AuthInterceptor.$inject = ['$rootScope', 'SessionService', '$location'];

		function AuthInterceptor($rootScope, SessionService, $location) {
			var AuthInterceptorService = {
				request: request,
				responseError: responseError 
			};

			return AuthInterceptorService;

			function request(config) {
				var access_token = SessionService.getAccessToken();
		        
		        if (access_token) {
		            config.headers.authorization = 'Bearer ' + access_token;
		        }
		
				return config;
			}

			function responseError(response) {
			    if (response.status === 400) {
			    	console.log('bad request');
			    }
   				if (response.status === 401) {
			    	console.log('unauthorized');

			    	//shouldnt logout
			    	//solution	
			    		//find a way to handle unauthorizzed 
			    		//in angular response
			    			
			    	$rootScope.auth.logout();
			    	$location.path('/');
			    }
			    if (response.status === 403) {
			    	console.log('forbidden');
			    }
			    
			    return response;
			}
		}////////////////End of AuthInterceptor Service////////////////////
}());