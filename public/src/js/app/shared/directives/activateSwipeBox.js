(function() {
	'use strict';
	angular.module('iNeedTreez')

		.directive('activateSwipeBox', activateSwipeBox);

		function activateSwipeBox() {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			function link(scope, elem, attrs) {
				$( '.swipebox' ).swipebox();

			}
			
		}////////////////End of actovate pretty photo directive////////////////////	
}());
