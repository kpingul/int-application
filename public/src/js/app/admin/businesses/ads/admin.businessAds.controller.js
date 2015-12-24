(function() {
    'use strict';

    angular.module('iNeedTreez')
        
        .controller('BusinessAdsCtrl', BusinessAds);

        BusinessAds.$inject = ['$scope', 'APIService', '$http', 'UserService'];

        function BusinessAds($scope, APIService, $http, UserService) {
        	var vm = this;

        	vm.businessAds = [];
            vm.businessAdsAvailable = false;
           
            APIService.getBusinessAds()
                .then(function(response) {
                    console.log(response);
                    if( response.error ){

                    } else if( response.length == 0 ) {

                        
                    } 
                    else {
                        vm.businessAds = response;
                        vm.businessAdsAvailable = true;
                    }
                }).catch(function( error) {
                    console.log(error);
                }); 

        	vm.add = function() {
                $("#modal-dialog-add").modal();
            }

            vm.edit = function(index) {
                
                $("#object-" + index).modal('show'); 
             

            }

            vm.addBusinessAd = function() {
             

                var file = vm.fileModel;
                var fd = new FormData();
                fd.append('file', file);

                APIService.uploadImage(fd)
                    .then(function( response ) {
                          if(response) {
                            var query = {
                                description: vm.description,
                                biz: UserService.getBusinessInformation().id,
                                imageUrl: response.data.path
                            };
                            APIService.addBusinessAd(query)
                                .then(function( response ) {
                                    $('#modal-dialog-add').modal('hide');
                                })
                                .catch(function( error ) {
                                    console.log(error);
                                });
                            }
                    })
                    .catch(function( error ) {
                        console.log(error);
                    });

            }

            vm.removeBusinessAd = function(indexOfAd) {

                APIService.deleteBusinessAd(indexOfAd)
                    .then(function( response ) {
                      
                    })
                    .catch(function( error ) {
                        console.log(error);
                    })
            }

            vm.updateBusinessAd = function(menuIndex, bizId, indexOfAd, updatedAdDescription, imageUrl) {

                if( vm.updatedAdImageFile == undefined ) {
                    var query = {
                        _id: indexOfAd,
                        imageUrl: imageUrl,
                        description: updatedAdDescription,
                        biz: bizId
                    };

                    $http.post('/api/ad/' + indexOfAd, query)
                            .then(function(response) {
                                console.log(response);
                            })
                            .catch(function(response) {
                                console.log(response);
                            });
                    
                } else {

                    var file = vm.updatedAdImageFile;
                    var fd = new FormData();
                    fd.append('file', file);


                    $http.post('/api/images', fd, {
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                            })
                            .then(function(response) {
                                 var query = {
                                    _id: indexOfAd,
                                    imageUrl: response.data.path,
                                    description: updatedAdDescription,
                                    biz: bizId
                                };

                                $http.post('/api/ad/' + indexOfAd, query)
                                        .then(function(response) {
                                            console.log(response);
                                            $('#object-' + menuIndex).modal('hide');
                                        })
                                        .catch(function(response) {
                                            console.log(response);
                                        });
                            })
                            .catch(function(error) {

                            });

                    }

            }

      
        

       

        }////////////////End of BusinessAds Ctrl////////////////////

}());