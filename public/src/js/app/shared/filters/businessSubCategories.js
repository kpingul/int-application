(function() {
	'use strict';
	angular.module('iNeedTreez')
		.filter('businessSubCategories', function() {
			return function (subCategory, selectedCategory) {
				var subCategories = [];
				var selectedCategory = selectedCategory;

				if( subCategory.length && selectedCategory ) {
					angular.forEach(subCategory, function( subCat, index ) {
                    	if( subCat.path == "," + selectedCategory.name + "," ) {
      
                        	subCategories.push(subCat);
                    	}
					});
				}
				return subCategories;
			}
		});
}());