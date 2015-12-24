(function() {
       'use strict';
       angular.module('iNeedTreez')
        .controller('SearchCtrl', SearchCtrl);

        SearchCtrl.$inject = ['$scope','APIService', '$stateParams', 'UserService', '$http'];

        function SearchCtrl ($scope, APIService, $stateParams, UserService, $http) {
            var vm = this;

            //stores business categories
            vm.businessCategories = [];

            //stores users selected category
            vm.selectedCategory = $stateParams.category;

            //stores users selected subcategory
            vm.selectedSubCategory = $stateParams.subCategory;
            
            //stores business results request
            vm.resultsOfBusinesses = [];

            //stores users search query information
            //based on the business type and location
            vm.userSearchQuery = {
                type: $stateParams.category,
                lat: $stateParams.lat,
                lng: $stateParams.lng
            };
     



            //Mock images for angular flexslider
            vm.images = ["src/images/slide1.jpg", "src/images/slide12.jpg"]

            //Call to APIService for business results
            APIService
                .searchBusinesses()
                .then(function( response ) {
                    console.log(response);
                    vm.resultsOfBusinesses = response;
                })
                .catch(function( error ) {
                   console.log(error);
                });

            //Call to APIService for business
            //categories
            APIService
                .getBusinessCategories("SearchMenu")
                .then(function( response ) {
                    vm.businessCategories = response;
                })
                .catch(function( error ) {
                    console.log(error);
                });

            
            //method that stores the selected business
            //and calls the UserService to cache the results
            //so that the information is persisted across the app
            vm.store = function(selectedBusinessInformation) {

                //Call to UserService to cache the selected business
                UserService.cacheSearchResults(selectedBusinessInformation);
            }

            //method that updates the existing search results and updates
            //the current business information details
            vm.searchBusinessCategories = function(category, subcategory, searchLocationDetails) {
                //code goes here..
          
            }
        }////////////////End of SearchCtrl////////////////////
}());