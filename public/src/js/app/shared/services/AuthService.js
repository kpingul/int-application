(function() {
	'use strict';
	angular.module('iNeedTreez') 
		.factory('AuthService', AuthService);

		AuthService.$inject = ['$http', '$window', 'GlobalAPI', 'SessionService'];

		function AuthService($http, $window, GlobalAPI, SessionService) {
			var AuthService = {
				login: login,
				logout: logout,
				register: register,
				isLoggedIn: isLoggedIn
			};

			return AuthService;

			function isLoggedIn() {

				return SessionService.getUserName() !== null;
			}

			function login(username, password) {

				return $http.post(GlobalAPI.url + 'auth/oauth/token',
				{ 
			      "grant_type": "password",
				  "client_id" : "iNeedTreezWebv1",
				  "client_secret": "LCeerVeAGDcaHY8z4v4tXprPQv",
				  "username": username,
				  "password": password
				}

				).then(function( response ){
					console.log(response);
					if(response.data.access_token) {
				    	SessionService.setAccessToken(response.data.access_token);
				      	SessionService.setUserName(response.data.user.username);
				      	SessionService.setName(response.data.user.fName + ' ' + response.data.user.lName );
				      	SessionService.setUserId(response.data.user._id);
				      	SessionService.setExpiration(response.data.expires_in);
				      	SessionService.setRefreshToken(response.data.refresh_token);

				      	return true;
					}

			      return false;
				})
				.catch(function( error ){
					return error;
				});
			}

			function logout() {
				SessionService.destroy();
			}

			function register(userInformation) {
				 	return $http
					.post('/api/users', userInformation)
					.then(function( response ) {
						return response;

					})
					.catch(function( error ) {
						console.log(error);
					});
			}

		}////////////////End of Auth Service////////////////////
}());