(function() {
    'use strict';
    angular.module('iNeedTreez')
        .factory('SessionService', SessionService);

        SessionService.$inject = ['$window'];

        function SessionService($window) {
        	
        	//Public API
        	var SessionServiceAPI = {
        		setAccessToken: setAccessToken,
                setName: setName,
				setUserName: setUserName,
                setUserId: setUserId,
                setExpiration: setExpiration,
                setRefreshToken: setRefreshToken,
                getAccessToken: getAccessToken,
                getName: getName,
                getUserName: getUserName,
                getUserId: getUserId,
                destroy: destroy
            };

        	return SessionServiceAPI;

            //Private API
			function setAccessToken(accessToken) {
                return $window.localStorage.setItem('access_token', accessToken);
            }

            function setExpiration(expiration) {
				return $window.localStorage.setItem('expires_in', expiration);
            }

            function setRefreshToken(refreshToken) {
                return $window.localStorage.setItem('refresh_token', refreshToken);
            }
              function setName(name) {
                return $window.localStorage.setItem('name', name);
            }

            function setUserName(userName) {
                return $window.localStorage.setItem('username', userName);                
            } 
            function setUserId(userId) {
                return $window.localStorage.setItem('userid', userId);                
            }
            
            function getAccessToken() {
                return $window.localStorage.getItem('access_token');                
            }

            function getName() {
                return $window.localStorage.getItem('name');
            }
            function getUserName() {
                return $window.localStorage.getItem('username');
            } 
            function getUserId() {
                return $window.localStorage.getItem('userid');
            }


            function destroy() {
                $window.localStorage.clear();
            }
        
        }////////////////End of Session Service////////////////////

}());