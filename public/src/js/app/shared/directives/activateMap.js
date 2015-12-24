(function() {
    'use strict';
    angular.module('iNeedTreez')
        .directive('activateMap', activateMap);

        activateMap.$inject = ['MapService'];

        function activateMap(MapService) {    
            var directive = {
                restrict: 'A',
                link: link
            };

            return directive;

            function link(scope, elem, attrs) {
                if( attrs.type ) {
                    MapService.activate(attrs.lat, attrs.lng, attrs.type);
                } else {
                    MapService.searchBusinesses(attrs.lat, attrs.lng);
                }
            
            }
            
        }////////////////End of activate map directive////////////////////   

}());
