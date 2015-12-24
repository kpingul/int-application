(function() {
    'use strict';
    angular.module('iNeedTreez')

    .directive('activateTestimonial', activateTestimonial);

    function activateTestimonial() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            var el = $('#nav-tabs a');

            el.on('click', handleClick);

            function handleClick(e) {
                e.preventDefault();
                $(this).tab("show");
            }

        }

    } ////////////////End of activateTestimonial directive////////////////////


}());