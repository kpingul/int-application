(function() {
    'use strict';
    angular.module('iNeedTreez')
       
       .directive('editContactModal', editContactModal);

        function editContactModal() {
            var directive = {
                restrict: 'E',
                templateUrl: 'src/js/app/admin/contacts/editContactModal.tpl.html',
                transclude: true,
                link: link
            };

            return directive;

            function link(scope, elem, attrs) {
                scope.editContact = function(index) {
                    $("#object-" + index).modal('show'); 
                    
                }  
             
            }

        }////////////////End of edit contact modal directive////////////////////


}());