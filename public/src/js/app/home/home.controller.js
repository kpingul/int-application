(function() {
    'use strict';
    angular.module('iNeedTreez')

    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'APIService', '$http'];

    function HomeCtrl($scope, APIService, $http) {
        var vm = this;

        //Store business categories
        vm.businessCategories = [];

        //category selected by user
        vm.selectedCategory = "";

        //subcategory selected by user
        vm.selectedSubCategory = "";

        //search destination selected by user
        vm.searchLocation = "";


        vm.resources = [
            'iNeedTreez720.mp4',
            '*.ogv',
            '*.swf'
        ];

        //Call to API Service to grab
        //business categories and bind
        //to the businessCategories vm
        APIService
            .getBusinessCategories("HomeCategories")
            .then(function( response ) {

                vm.businessCategories = response;
            })
            .catch(function( error ) {
                console.log(error);
            });

        //
        APIService
            .searchBusinesses()
            .then(function(response) {
                if( response ) {
                    response.map(function( business, index ) {
                    
                    });
                }
            });


    } ////////////////End of HomeCtrl////////////////////

}());