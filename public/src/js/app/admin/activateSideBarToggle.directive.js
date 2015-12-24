(function() {
	'use strict';
	angular.module('iNeedTreez')
	   
       .directive('activateSideBarToggle', activateSideBarToggle);

		function activateSideBarToggle() {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			function link(scope, elem, attrs) {
				elem.on('click', function(e) {
					console.log('ss')
					e.stopPropagation();
			    	var sidebarClass = 'sidebar-toggled';
			    	var targetContainer = '#page-cont';
			    	if ($(targetContainer).hasClass(sidebarClass)) {
			            $(targetContainer).removeClass(sidebarClass);
			        } else {
			            $(targetContainer).addClass(sidebarClass);
			    	}
				})
			
			}

		}////////////////End of activate Side Bar Menu Toggle directive////////////////////


}());