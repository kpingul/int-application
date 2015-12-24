(function() {
    'use strict';
    angular.module('iNeedTreez')

        .controller('ProfileCtrl', ProfileCtrl);

        ProfileCtrl.$inject = ['$scope', 'APIService', 'MapService', 'UserService', '$window'];

        function ProfileCtrl($scope, APIService, MapService, UserService, $window) {
            var vm = this;
            //stores business ad images
            vm.businessAdImages = [];

            //stores business categories 
            vm.categories = [];

            //stores business information 
            vm.businessInformation = UserService.getBusinessInformation();

            vm.businessMenus = [];

            vm.toggleShare = false;

            //**bottle neck
            //does not provide consistent url of profile for business
            vm.shareUrl = $window.location.href;

            
            //calls getLocation to calculate distance of current location 
            //to business
            getLocation(vm.businessInformation.lat, vm.businessInformation.lng);
            
            APIService
                .getBusinessAds()
                .then(function( response ) {

                    if( response.length > 0 ) {
                        var businessAds = [];
                        response.map(function( val, index ) {
                             //eg: ["https://photo.jpg", "photo Description"]
                             //The reason is because angular flexslider plugin 
                             //doesn't iterate JSON objects but only arrays
                             businessAds.push(val.imageUrl + ',' + val.description);
                         });

                        vm.businessAdImages = businessAds;

                    } else {
                        vm.businessAdImages = ["src/images/businessadplaceholder.png"]
                    }
                })
                .catch(function( error ) {
                    console.log(error);
                });

      
            APIService
                .getBusinessCategories()
                .then(function( response ) {
                    vm.categories = response;
                })
                .catch(function( error ) {
                    console.log(error);
                });


            function getLocation( lat, lng ) {
                navigator.geolocation.getCurrentPosition(
                    function( position ) {
          
                        var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                        var latLngB = new google.maps.LatLng(lat,lng);
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                        vm.distance = Math.round(distance * 0.000621371192);//In metres
                    },
                    function() {
                        console.log("geolocation not supported!!");
                    }
                );
            }
        } ////////////////End of ProfileCtrl////////////////////


}());