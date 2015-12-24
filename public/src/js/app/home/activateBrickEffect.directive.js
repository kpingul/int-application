(function() {
	'use strict';
	angular.module('iNeedTreez')
	   
       .directive('activateBrickEffect', activateBrickEffect);

		function activateBrickEffect() {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			function link(scope, elem, attrs) {
				//speed contains the time  
				//for the animation effect 
            	var speed = 1,
            	//content contains target 
            	//element for the content to
            	//activate the effects on
					content = '.content';

				//listens for mouseover event and
				//fires handleMouseOver effect
				elem.on('mouseover', handleMouseOver);

				//listens for mouseout event and
				//fires handleMouseOver effect
				elem.on('mouseout', handleMouseOut);

				//handles mouseover event and activates
				//the animation on the content element
				function handleMouseOver() {
					elem.children(content).animate({
						left: '0px'
					}, speed);
				}

				//handles mouseout event and activates
				//the animation on the content element
				function handleMouseOut() {
					elem.children(content).animate({
						left: '-100%'
					}, speed);
				}
			}

		}////////////////End of activateBrickEffect directive////////////////////


}());