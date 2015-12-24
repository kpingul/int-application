(function() {
    'use strict';

    angular.module('iNeedTreez')

    .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$scope', 'APIService', 'UserService', '$state', '$rootScope'];

    function ContactCtrl($scope, APIService, UserService, $state, $rootScope) {
        var vm = this;
        vm.contacts = [];
        vm.businessInformation = UserService.getBusinessInformation();


        APIService.getContacts()
            .then(function(response) {
                vm.contacts = response;
            })
            .catch(function(error) {
                console.log(error);
            });

        vm.addContact = function() {

            var newContact = {
                name: vm.businessInformation.name,
                phone: vm.businessInformation.phone
            };

            APIService.addContact(newContact)
                .then(function(response) {
                    console.log(response);

                })
                .catch(function(error) {
                    console.log(error);
                });


            vm.newContactName = "";
            vm.newContactNumber = "";
        }

        vm.updateContact = function(id, editedName, editedNumber) {
            var contact = {
                name: editedName,
                phone: editedNumber
            };


            APIService.updateContact(id, contact)
                .then(function(response) {
                    console.log(response);

                })
                .catch(function(error) {
                    console.log(error);
                });

        }

        vm.deleteContact = function(id) {
            APIService.deleteContact(id)
                .then(function(response) {
                    console.log(response);

                })
                .catch(function(error) {
                    console.log(error);
                });
        }

   


    } ////////////////End of Admin Ctrl////////////////////

}());