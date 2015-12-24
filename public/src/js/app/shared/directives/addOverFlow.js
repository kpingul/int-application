(function() {
	'use strict';
	angular.module('iNeedTreez')
		.directive('addOverFlow', addOverFlow);

		function addOverFlow() {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;
			
			function link(scope, elem, attrs) {
				if (attrs.data == "remove") {
					$('body').css('overflow-y', 'initial')	
				}
			}

		}////////////////End of addOverflow directive////////////////////	
}());