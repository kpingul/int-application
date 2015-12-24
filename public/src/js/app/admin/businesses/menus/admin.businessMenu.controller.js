(function() {
    'use strict';

    angular.module('iNeedTreez')

    .controller('BusinessMenuCtrl', BusinessMenuCtrl);

    BusinessMenuCtrl.$inject = ['$scope', 'APIService', '$http', 'UserService'];

    function BusinessMenuCtrl($scope, APIService, $http, UserService) {
        var vm = this;
        vm.businessMenus = [];
        vm.businessMenuId = "";
        vm.businessMenuItems = [];
        vm.businessMenuItem = "";
        vm.businessCategory = "";
        vm.businessMenuAvailable = false;

        APIService.getBusinessMenu()
            .then(function(response) {
                console.log(response);
                if( response.error ) {

                }
                else if( response.length == 0) {

                } 
                else {
                    vm.businessMenus = response;
                    vm.businessMenuAvailable = true;
                    
                }
            })
            .catch(function(error) {
                console.log(error);

            });

        vm.addBusinessMenuItems = function(item) {
            if(item !== "") {
                vm.businessMenuItems.push(item);
                vm.businessMenuItem = "";
                
            }
        }

        /*
            create a directive that toggles modal 
            with add and edit to abstract
            away DOM manipulation in controller
    
        */  
        vm.add = function () {
            $('#modal-dialog-add').modal();
        }

        vm.edit = function(index) {
            console.log(index)
            $('#object-' + index).modal('show');

        }
        vm.editItem = function(indexOfItem) {

        }
        vm.deleteItem = function(menuIndex, indexOfItem) {
            vm.businessMenus[menuIndex].categories[0].items.splice(indexOfItem, 1);
        }
        vm.addItem = function(menuIndex) {
            vm.businessMenus[menuIndex].categories[0].items.push(vm.addedItem);
            vm.addedItem = "";

        }
        vm.updateBusinessMenu = function(menuIndex, menuId, categoryName, categoryId, picture, items) {
            
            /*
                Too much logic in controller 
                Find a way to abstract logic 
                so that the controller is more
                clean. 

                why? Not following DRY principle with
                repeated API requests
            */


            if(vm.editMenuImageFile == undefined && vm.newCategoryName == undefined) {
                var query = {
                    name: categoryName,
                    _id: categoryId,
                    picture: picture,
                    items: items
                };

                
                $http.post('/api/menu/' + menuId + '/category/' + categoryId, query)
                        .then(function( response ) {
                            console.log(response);
                        })
                        .catch(function( error ) {
                            console.log(error);
                        });
            }

            else if(vm.newCategoryName == undefined) {

                var file = vm.editMenuImageFile;
                var fd = new FormData();
                fd.append('file', file);


                $http.post('/api/images', fd, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                        .then(function(response) {

                            var query = {
                                name: categoryName,
                                _id: categoryId,
                                picture: response.data.path,
                                items: items
                            };

                            
                            $http.post('/api/menu/' + menuId + '/category/' + categoryId, query)
                                    .then(function( response ) {
                                        console.log(response);
                                    })
                                    .catch(function( error ) {
                                        console.log(error);
                                    });
                            
                        })
                        .catch(function(error) {
                            console.log(error);
                        })

               
            }

            else if(vm.editMenuImageFile == undefined) {

                var query = {
                    name: vm.newCategoryName,
                    _id: categoryId,
                    picture: picture,
                    items: items
                };

                
                $http.post('/api/menu/' + menuId + '/category/' + categoryId, query)
                        .then(function( response ) {
                            console.log(response);
                        })
                        .catch(function( error ) {
                            console.log(error);
                        });

            }

            else {

                var file = vm.editMenuImageFile;
                var fd = new FormData();
                fd.append('file', file);


                $http.post('/api/images', fd, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                        .then(function(response) {

                            var query = {
                                name: vm.newCategoryName,
                                _id: categoryId,
                                picture: response.data.path,
                                items: items
                            };

                            
                            $http.post('/api/menu/' + menuId + '/category/' + categoryId, query)
                                    .then(function( response ) {
                                        $('#object-' + menuIndex).modal('hide');
                                    })
                                    .catch(function( error ) {
                                        console.log(error);
                                    });
                            
                        })
                        .catch(function(error) {
                            console.log(error);
                        })

                
            }

        }
        vm.deleteBusinessMenu = function(menuId) {
          APIService.deleteBusinessMenu(menuId)
                .then(function( response ) {
                    console.log(response);
                })
                .catch(function( error ) {
                    console.log(error);
                });
        }

        vm.addBusinessMenu = function() {
            var file = vm.addMenuImageFile;
            var fd = new FormData();
            fd.append('file', file);

            $http.post('/api/menu', {biz: UserService.getBusinessInformation().id})
                    .then(function( response ) {
                        if( response ) {
                            APIService.getBusinessMenu()
                                .then(function(response1) {
                                    if( response1 ) {
                                        var menuId = response1[response1.length - 1]._id;

                                         $http.post('/api/images', fd, {
                                             transformRequest: angular.identity,
                                             headers: {'Content-Type': undefined}
                                         })
                                         .then(function ( response2 ) {

                                            if( response2 ) {
                                                var query = {
                                                    name: vm.businessCategory,
                                                    picture: response2.data.path,
                                                    items: vm.businessMenuItems
                                                };

                                                $http.post('/api/menu/' + menuId + '/category/', query)
                                                    .then(function(response) {
                                                        console.log(response);
                                                    })
                                                    .catch(function(error) {
                                                        console.log(error);
                                                    });
                                            }

                                         })
                                         .catch(function( error ) {
                                            console.log(error);
                                         })

                                    }
                                 
                                })
                                .catch(function(error) {
                                    console.log(error);

                                });
                        }
                    })
                    .catch(function( error ) {
                        console.log(error);
                    });


        }



    } ////////////////End of BusinessMenu Ctrl////////////////////

}());