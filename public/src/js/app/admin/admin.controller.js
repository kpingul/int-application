(function() {
    'use strict';

    angular.module('iNeedTreez')
        
        .controller('AdminCtrl', AdminCtrl);

        AdminCtrl.$inject = ['$scope', 'APIService', 'GlobalAPI', '$http', 'SessionService', '$state'];

        function AdminCtrl($scope, APIService, GlobalAPI, $http, SessionService, $state) {
            var vm = this;
            
            //cache state so that the submenu
            //within the admin tpl gets activated
            //since the ui-sref-active cannot be
            //implemented twice
            $scope.$state = $state;
            vm.businesses = [];
            APIService
                .getOwnersBusinesses()
                .then(function(response) {
                    vm.businesses = response.data;
                })


        }////////////////End of Admin Ctrl////////////////////

}());