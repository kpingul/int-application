(function() {
    'use strict';
    angular.module('iNeedTreez')
        .directive('businessMenu', BusinessMenu);

        BusinessMenu.$inject = ['APIService'];

        function BusinessMenu(APIService) {    
            var directive = {
                restrict: 'E',
                scope: {},
                templateUrl: 'src/js/app/profile/profile.businessmenu.tpl.html',
                controller: controller,
                link: link
            };

            return directive;

            function controller($scope, APIService) {

           		$scope.businessMenus = [];
           		$scope.filteredMenus = [];
            	$scope.subs = 3;
            	$scope.businessMenuAvailable = true;

            	APIService
                    .getBusinessMenu()
                    .then(function(response) {
                        console.log( response )
                        if( response.error ) {
                            $scope.businessMenuAvailable = false;
                        } else if ( response.length <= 0 )
                            $scope.businessMenuAvailable = false;

                        else {
                        	$scope.businessMenus = response;
                        	var sliced = $scope.businessMenus.slice(0);
                            $scope.filteredMenus = sliced;
                           
                            // $scope.filteredMenus.push($scope.businessMenus[0]);
                            // $scope.filteredMenus.push($scope.businessMenus[1]);
                            // $scope.filteredMenus.push($scope.businessMenus[2]);
                            
                        }

					            			

                    })
                    .catch(function( error ) {
                        console.log(error);
                    });

            	$scope.next = function() {
            		$scope.filteredMenus = [];
            		$scope.filteredMenus.push($scope.businessMenus[3]);
            		$scope.filteredMenus.push($scope.businessMenus[4]);
            	}

            	$scope.prev = function() {
            	
        			$scope.filteredMenus = [];
        			$scope.filteredMenus.push($scope.businessMenus[0]);
        			$scope.filteredMenus.push($scope.businessMenus[1]);
                    $scope.filteredMenus.push($scope.businessMenus[2]);
            		
            	}
            }

            function link(scope, elem, attrs) {
            	// console.log(attrs);
            
            }
            
        }////////////////End of BusinessMenu directive////////////////////   

}());
