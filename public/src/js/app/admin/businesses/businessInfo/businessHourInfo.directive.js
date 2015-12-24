(function() {
    'use strict';
    angular.module('iNeedTreez')
       
       .directive('businessHourSelection', businessHourSelection);

        function businessHourSelection() {
            var directive = {
                restrict: 'E',
                templateUrl: 'src/js/app/admin/businessInfo/businessHourInfo.tpl.html',
                transclude: true,
                link: link
            };

            return directive;

            function link(scope, elem, attrs) {
              
             
            }

        }////////////////End of edit business hour selection directive////////////////////


}());