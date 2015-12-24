(function() {
	'use strict';
	angular.module('iNeedTreez')
	   
       .directive('activateSideBarMenu', activateSideBarMenu);

		function activateSideBarMenu() {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			function link(scope, elem, attrs) {

				elem.on('click' , function(e) {
					var target = $(elem).next('.sub-menu');
                	var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
                
              	  	$(otherMenu).not(target).slideUp(250);
                	$(target).slideToggle(250);
				});
		


			}

		}////////////////End of activate Side Bar Menu Toggle directive////////////////////


}());