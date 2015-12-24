(function() {
	'use strict';

	angular.module('iNeedTreez')

		.config(['$urlRouterProvider', '$stateProvider','$httpProvider', '$locationProvider', 

			function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
				
				$urlRouterProvider.when('', '/')

				//renders profile/main template when users locates to
				//profile state 
				$urlRouterProvider.when('/profile', '/profile/main')
				$urlRouterProvider.when('/admin', '/admin/businesses')
				

				$stateProvider
					.state('home', {
						url: '/',
						templateUrl: 'src/js/app/home/home.tpl.html',
						controller: 'HomeCtrl',
						controllerAs: 'vm'
					})
					.state('search', {
						url: '/search/:category/:subCategory/:lat/:lng',
						templateUrl: 'src/js/app/search/search.tpl.html',
						controller: 'SearchCtrl',
						controllerAs: 'vm'

					})
				
					.state('profile', {
						url: '/profile',
						templateUrl: 'src/js/app/profile/profile.tpl.html',
						controller: 'ProfileCtrl',
						controllerAs: 'vm',
						authenticate: true
					})
						.state('profile.main', {
							url: '/main/:id',
							templateUrl: 'src/js/app/profile/profile.main.tpl.html',
							authenticate: true
						})
						.state('profile.menu', {
							url: '/menu',
							templateUrl: 'src/js/app/profile/profile.menu.tpl.html',
							authenticate: true
						})
						.state('profile.map', {
							url: '/map',
							templateUrl: 'src/js/app/profile/profile.map.tpl.html',
							authenticate: true
						})
					.state('admin', {
						url: '/admin', 
						templateUrl: 'src/js/app/admin/admin.tpl.html',
						css: 'admin/assets/css/style.css',
						controller: 'AdminCtrl',
						controllerAs: 'vm',
						authenticate: true
					})
						.state('admin.businesses', {
							url: '/businesses',
							templateUrl: 'src/js/app/admin/businesses/admin.businesses.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'BusinessesCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
							.state('admin.businesses.info', {

								url: '/edit/info/:businessId',
								templateUrl: 'src/js/app/admin/businesses/businessInfo/admin.businessInfo.tpl.html',
								css: 'admin/assets/css/style.css',
								controller: 'BusinessInfoCtrl',
								controllerAs: 'vm',
								authenticate: true
							})
							.state('admin.businesses.menu', {

								url: '/edit/menu/:businessId',
								templateUrl: 'src/js/app/admin/businesses/menus/admin.businessMenu.tpl.html',
								css: 'admin/assets/css/style.css',
								controller: 'BusinessMenuCtrl',
								controllerAs: 'vm',
								authenticate: true
							})
							.state('admin.businesses.ads', {

								url: '/edit/ads/:businessId',
								templateUrl: 'src/js/app/admin/businesses/ads/admin.businessAds.tpl.html',
								css: 'admin/assets/css/style.css',
								controller: 'BusinessAdsCtrl',
								controllerAs: 'vm',
								authenticate: true
							})
						.state('admin.message', {
							url: '/message',
							templateUrl: 'src/js/app/admin/messages/admin.message.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'MessageCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.contact', {
							url: '/contact',
							templateUrl: 'src/js/app/admin/contacts/admin.contact.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'ContactCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.businessInfo', {
							url: '/businessInfo',
							templateUrl: 'src/js/app/admin/businessInfo/admin.businessInfo.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'BusinessInfoCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.menu', {
							url: '/menu',
							templateUrl: 'src/js/app/admin/menus/admin.businessMenu.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'BusinessMenuCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.ads', {
							url: '/ads',
							templateUrl: 'src/js/app/admin/ads/admin.businessAds.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'BusinessAdsCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.packages', {
							url: '/packages',
							templateUrl: 'src/js/app/admin/subscriptions/admin.packages.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'PackagesCtrl',
							controllerAs: 'vm',
							authenticate: true
						})
						.state('admin.payments', {
							url: '/payments',
							templateUrl: 'src/js/app/admin/subscriptions/admin.payments.tpl.html',
							css: 'admin/assets/css/style.css',
							controller: 'PaymentsCtrl',
							controllerAs: 'vm',
							authenticate: true
						})


				//Attaches the auth token to the HTTP headers
				//if the users is logged in so that the request
				//to the server is included with the token
				$httpProvider.interceptors.push('AuthInterceptor');

				
				// $locationProvider.html5Mode({
			 //  		enabled: true,
			 //  		requireBase: false
				// });
				

		}]);
	
}());