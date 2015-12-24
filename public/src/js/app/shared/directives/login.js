(function() {
    'use strict';
    angular.module('iNeedTreez')
        .directive('login', login);

    login.$inject = ['AuthService', 'ModalService'];

    function login(AuthService, ModalService) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            elem.on('click', handleClick);

            function handleClick( e ) {
                ModalService.showModal({
                    templateUrl: "src/js/app/login/login.tpl.html",
                    controller: "LoginCtrl",
                    controllerAs: 'vm'

                }).then(function( modal ) {
                    modal.element.modal();

                });
            }

        }

    } ////////////////End of activate map directive////////////////////   

}());