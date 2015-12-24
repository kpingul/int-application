(function() {
    'use strict';

    angular.module('iNeedTreez')

    .controller('BusinessInfoCtrl', BusinessInfoCtrl);

    BusinessInfoCtrl.$inject = ['$scope', 'APIService', 'SessionService'];

    function BusinessInfoCtrl($scope, APIService, SessionService) {
        var vm = this;
        //BusinessTypes contain the businesses
        //that are available in the API
        vm.businessTypes = [];

        //Call to API Service to grab business
        //categories data
        APIService
            .getBusinessCategories()
                .then(function(response) {

                     vm.businessTypes = response;
              
                })
                .catch(function(error) {
                    console.log(error);
                });


        vm.addBusiness = function() {

            var query = {
                name: vm.businessName,
                hours: {
                    sun: {
                        open: {
                            hh: Number(vm.sunOpen[0] + vm.sunOpen[1]),
                            mm: Number(vm.sunOpen[3] + vm.sunOpen[4])
                        },
                        close: {
                            hh: Number(vm.sunClosed[0] + vm.sunClosed[1]),
                            mm: Number(vm.sunClosed[3] + vm.sunClosed[4])
                        }
                    },
                    mon: {
                        open: {
                            hh: Number(vm.monOpen[0] + vm.monOpen[1]),
                            mm: Number(vm.monOpen[3] + vm.monOpen[4])
                        },
                        close: {
                            hh: Number(vm.monClosed[0] + vm.monClosed[1]),
                            mm: Number(vm.monClosed[3] + vm.monClosed[4])
                        }
                    },
                    tue: {
                        open: {
                            hh: Number(vm.tueOpen[0] + vm.tueOpen[1]),
                            mm: Number(vm.tueOpen[3] + vm.tueOpen[4])
                        },
                        close: {
                            hh: Number(vm.tueClosed[0] + vm.tueClosed[1]),
                            mm: Number(vm.tueClosed[3] + vm.tueClosed[4])
                        }
                    },
                    wed: {
                        open: {
                            hh: Number(vm.wedOpen[0] + vm.wedOpen[1]),
                            mm: Number(vm.wedOpen[3] + vm.wedOpen[4])
                        },
                        close: {
                            hh: Number(vm.wedClosed[0] + vm.wedClosed[1]),
                            mm: Number(vm.wedClosed[3] + vm.wedClosed[4])
                        }
                    },
                    thu: {
                        open: {
                            hh: Number(vm.thuOpen[0] + vm.thuOpen[1]),
                            mm: Number(vm.thuOpen[3] + vm.thuOpen[4])
                        },
                        close: {
                            hh: Number(vm.thuClosed[0] + vm.thuClosed[1]),
                            mm: Number(vm.thuClosed[3] + vm.thuClosed[4])
                        }
                    },
                    fri: {
                        open: {
                            hh: Number(vm.friOpen[0] + vm.friOpen[1]),
                            mm: Number(vm.friOpen[3] + vm.friOpen[4])
                        },
                        close: {
                            hh: Number(vm.friClosed[0] + vm.friClosed[1]),
                            mm: Number(vm.friClosed[3] + vm.friClosed[4])
                        }
                    },
                    sat: {
                        open: {
                            hh: Number(vm.satOpen[0] + vm.satOpen[1]),
                            mm: Number(vm.satOpen[3] + vm.satOpen[4])
                        },
                        close: {
                            hh: Number(vm.satClosed[0] + vm.satClosed[1]),
                            mm: Number(vm.satClosed[3] + vm.satClosed[4])
                        }
                    },
                },
                address: {   
                    street: vm.businessStreet,
                    country: vm.businessCountry,
                    state: vm.businessState,
                    city: vm.businessCity,
                    postalCode: vm.businessZipCode,
                    lat: 37.1033,
                    long: -121.3877
                },
                phone: vm.businessPhone,
                website: vm.businessWebsite,
                owner: SessionService.getUserId(),
                categories: [],
                ads: [],
                menus: []
            };
       

            APIService.addBusiness(query)
                .then(function( response ) {
                    console.log(response);
                })
                .catch( function( error ) {
                    console.log(error);
                });
        }

    } ////////////////End of BusinessInfo Ctrl////////////////////

}());