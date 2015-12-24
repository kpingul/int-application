(function() {
	'use strict';
	angular.module('iNeedTreez')
		.filter('businessCategories', function() {
			return function (category) {
				var categories = [];

				if( category.length ) {
                	angular.forEach(category, function( business, index ) {
                		if( !business.path ) {
                			categories.push(business);
                		}
                	});
				}

				return categories;
			}
		});
}());