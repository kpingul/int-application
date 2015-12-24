(function() {
    'use strict';

    angular.module('iNeedTreez')

    .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$scope', 'APIService', '$http', 'UserService', 'SessionService'];

    function MessageCtrl($scope, APIService, $http, UserService, SessionService) {
        var vm = this;
        vm.messages = [];
        vm.businessInformation = UserService.getBusinessInformation();
        vm.toggleMessage = false;
        vm.replyUserId = "";
        vm.currentUser = SessionService.getUserName();
        console.log(vm.currentUser)
        APIService.getMessages()
            .then(function(response) {
                console.log(response);
                vm.messages = response;
            })
            .catch(function(error) {
                console.log(error);

            });

        vm.deleteMessage = function(messageId) {
            $http.delete('/api/messages/' + messageId)
                    .then(function(response) {
                        console.log(response);
                        
                    })
                    .catch(function(error) {
                        console.log(error);

                    });
            
        }

        vm.sendMessage = function() {
           $http.post('/api/messages', {
                to: [vm.businessInformation.ownerId],
                message: vm.newMessage
            })
            .then(function(response) {
                console.log(response);
                vm.message = "";
            })
            .catch(function(error) {
                console.log(error);
            });
        }

        vm.replyToUser = function(userId) {
            vm.toggleMessage = true;
            vm.replyUserId = userId;
        }

        vm.replyBackMessage = function() {
        
            var query = {
                to: [vm.replyUserId],
                message: vm.replyMessage
            };

            $http.post('/api/messages', query)
                    .then(function(response) {
                        vm.replyMessage = "";
                    })
                    .catch(function(error) {

                    });
        }


 

    } ////////////////End of Message Ctrl////////////////////

}());