(function() {
    'use strict';
    angular.module('iNeedTreez')
        .directive('signUp', signUp);

    signUp.$inject = ['AuthService', 'ModalService'];

    function signUp(AuthService, ModalService) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            elem.on('click', handleClick);

            function handleClick(e) {
                ModalService.showModal({
                    templateUrl: "src/js/app/register/register.tpl.html",
                    controller: "RegisterCtrl",
                    controllerAs: 'vm'

                }).then(function(modal) {
                    modal.element.modal();

                });
            }

        }

    } ////////////////End of signUp directive////////////////////   

}());