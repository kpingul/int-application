(function() {
    'use strict';
    angular.module('iNeedTreez')
        .directive('menuToggle', menuToggle);

        function menuToggle() {    
            var directive = {
                restrict: 'A',
                link: link
            };

            return directive;

            function link(scope, elem, attrs) {
                elem.on('click', handleClick);

                function handleClick( e ) {
                    if(attrs.clicked == "prev") {
                        
                        if( scope.filteredMenus.length >= 2 ) {
                            scope.prev();
                            scope.$apply();
                        }
                    }
                    
                    if( attrs.clicked == "next" ) {
                        scope.next();
                        scope.$apply();
                    }
                }
            }
            
        }////////////////End of BusinessMenu directive////////////////////   

}());
