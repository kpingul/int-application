(function() {
	'use strict';
	angular.module('iNeedTreez')
		.controller('RegisterCtrl', RegisterCtrl);

		RegisterCtrl.$inject = ['$scope', 'AuthService', '$element', 'close'];

		function RegisterCtrl($scope, AuthService, $element, close) {
			var vm = this;

			vm.register = function() {
				var query = {
						username: vm.userName,
						email: vm.email,
						password: vm.password,
						fName: vm.firstName,
						lName: vm.lastName,
						address: {
							street: vm.address,
							country: vm.country,
							state: vm.state,
							postalCode: vm.postalCode,
							lat: "37.122",
							long: "-122.3221"
						}
				};

				AuthService
					.register(query)
					.then(function(response){
						AuthService
							.login(response.data.username, query.password)
							.then(function(response) {
								$element.modal('hide');
								close(null, 500);
							});
					});
					
			
			}

		}////////////////End of RegisterCtrl////////////////////

}());