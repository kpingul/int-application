(function() {
    'use strict';
    angular.module('iNeedTreez')
        .factory('UserService', UserService);

        UserService.$inject = ['$window'];

        function UserService($window) {
        	
        	//Public API
        	var UserServiceAPI = {
        		cacheSearchResults: cacheSearchResults,
        		getBusinessInformation: getBusinessInformation
        	};

        	return UserServiceAPI;

        	//Private Methods
        	function cacheSearchResults(searchResult) {
                $window.localStorage.setItem('business_id', searchResult._id);
        		$window.localStorage.setItem('business_ownerId', searchResult.owner);
        		$window.localStorage.setItem('business_name', searchResult.name);
                $window.localStorage.setItem('business_phone', searchResult.phone);
        		$window.localStorage.setItem('business_address', searchResult.address.street + ' ' + searchResult.address.city + ', ' + searchResult.address.state + ' ' + searchResult.address.country + ' ' + searchResult.address.postalCode);
        		$window.localStorage.setItem('business_website', searchResult.website);
        		$window.localStorage.setItem('business_lat', searchResult.address.lat);
        		$window.localStorage.setItem('business_lng', searchResult.address.long);

        	}
        	function getBusinessInformation() {
        		var businessInfo = {
                    id: $window.localStorage.getItem('business_id'),
        			ownerId: $window.localStorage.getItem('business_ownerId'),
        			name: $window.localStorage.getItem('business_name'),
                    phone: $window.localStorage.getItem('business_phone'),
        			address: $window.localStorage.getItem('business_address'),
        			website: $window.localStorage.getItem('business_website'),
        			lat: $window.localStorage.getItem('business_lat'),
        			lng: $window.localStorage.getItem('business_lng')
        		};

        		return businessInfo;
        	}

        }////////////////End of User Service////////////////////

}());