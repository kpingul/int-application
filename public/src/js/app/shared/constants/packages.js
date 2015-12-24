(function() {
    'use strict';
    	angular.module('iNeedTreez')
        	.constant('SubPackages', [
        	{
        		type: "Starter",
        		price: 50,
        		features: [
        			"2 Ads",
        			"3 Menus (10x listings each)",
        			"Bronze SEO Pack"
        		]
        	},
        	{
        		type: "Premium",
        		price: 300,
        		features: [
        			"6 Ads",
        			"6 Menus (20x listings each)",
        			"Silver SEO Pack", 
        			"Featured on *Highly Recomended* businesses",  
        			"Front Page Revolving Door Ads ($3000)"
        		]
        	},
        	{
        		type: "Ultimate",
        		price: 1000,
	        	features: [	
	        		"9 Ads",
	        		"9 Menus (30x listings each)",
	        		"Gold SEO Pack",
	        		"Featured on *Highly Recomended* businesses",
	        		"Geo-Fenced Ads",
	        		"Front Page Revolving Door Ads ($3000)"
        		]
        	}
        ]     

        );

})();