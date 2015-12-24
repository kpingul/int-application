(function() {
    'use strict';

    angular.module('iNeedTreez')

    .controller('PackagesCtrl', PackagesCtrl);

    PackagesCtrl.$inject = ['$scope', 'APIService', 'SubPackages'];

    function PackagesCtrl($scope, APIService, SubPackages) {
        var vm = this;
        vm.packages = SubPackages;
        console.log(vm.packages);

        vm.showModal = function(index) {
        	$('#paymentModal-' + index).modal('show');
        }
 

    } ////////////////End of Packages Ctrl////////////////////

}());