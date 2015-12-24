(function() {
    'use strict';
    angular.module('iNeedTreez')
       
       .directive('addContactModal', addContactModal);

       addContactModal.$inject = ['$rootScope'];

        function addContactModal($rootScope) {
            var directive = {
                restrict: 'A',
                link: link
            };

            return directive;

            function link(scope, elem, attrs) {
                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          
                    if( fromState.name == "profile.main") {
                            
                        $('#addContact').modal('show');
             
                    }
                        
                    
                });

               scope.vm.addModal = function() {
                    
                        $('#addContact').modal('show');
                    
                }

           
            }

        }////////////////End of add contact modal directive////////////////////


}());