

(function() {
	'use strict';
	angular.module('iNeedTreez')

		.factory('APIService', APIService);

		APIService.$inject = ['$http', 'GlobalAPI', 'SessionService', 'UserService'];

		function APIService($http, GlobalAPI, SessionService, UserService) {
			

			var APIService = {
                getOwnersBusinesses : getOwnersBusinesses,
				getBusinessAds: getBusinessAds,
				getBusinessCategories: getBusinessCategories,
				getBusinessMenu: getBusinessMenu,
				deleteBusinessMenu: deleteBusinessMenu,
				getMessages: getMessages,
				getContacts: getContacts,
				updateContact: updateContact,
				deleteContact: deleteContact,
				addContact: addContact,
				searchBusinesses: searchBusinesses,
				addBusiness: addBusiness,
				addBusinessAd: addBusinessAd,
				deleteBusinessAd: deleteBusinessAd,
				uploadImage: uploadImage,
				geoFence: geoFence
			};

			return APIService;

			function getOwnersBusinesses() {
		   
                return $http
		           .get('/api/users/' + SessionService.getUserName() + '/businesses/')
		           .then(function( response ) {
		           		return response;
		                console.log(response);
		            })
		            .catch(function( error ) {
		                console.log(error);
		            });

			}

			function getBusinessAds() {

		
					return $http
						.get(GlobalAPI.url + 'ad/' + UserService.getBusinessInformation().id)
						.then(function(response) {
							return response.data;
						})
						.catch(function(error) {
							console.log(error);
						});

			}
			function getBusinessCategories(query) {
				
				if(query) {
					//Query Example from API
					//api/business/categories
					return $http
	                         .get(GlobalAPI.url + 'businesses/categories')
	                         .then(function(response) {
	                         	return response.data;
	                         })
	                         .catch(function(error) {
	                         	return error;
	                         })
				}
				//Query Example from API
				//api/business/categories
				return $http
                         .get(GlobalAPI.url + 'businesses/categories')
                         .then(function(response) {

                            var categories = {
                            	Treez: {name: "Treez", list: []},
                            	Tools: {name: "Tools", list: []},
                            	Legal: {name: "Legal", list: []},
                            	Products: {name: "Products", list: []},
                            };
                            var sliced = response.data.slice(4);
                            
                            sliced.map(function(val, index) {
                            	if( val.path == ',Treez,' && categories.Treez) {
                            		categories.Treez.list.push(val);
                            	}	
                            	if( val.path == ',Tools,' && categories.Tools ) {
                            		categories.Tools.list.push(val);

                            	}	
                            	if( val.path == ',Legal,' && categories.Legal ) {
                            		categories.Legal.list.push(val);
                            	}	
                            	if( val.path == ',Products,' && categories.Products ) {
                            		categories.Products.list.push(val);
                            	}	
                            });
                            console.log()
                            return categories
                         })
                         .catch(function(error) {
                               console.log(error);
                         });
			}

			function getBusinessMenu() {

				return $http.get(GlobalAPI.url + 'menu/' + SessionService.getUserName())
								.then(function(response) {
									return response.data;
								})
								.catch(function(error) {
									return error;
								});
			}

			function deleteBusinessMenu(menuId) {
			
				return $http.delete(GlobalAPI.url + 'menu/' + menuId)
								.then(function( response ) {
									console.log(response);
								})
								.catch(function( error ) {
									console.log(error);
								})

			}

			function getMessages() {
				return $http.get(GlobalAPI.url + 'messages')
			                     .then(function(response) {
			                     	console.log(response)
			                           return response.data;
			                     })
			                     .catch(function(error) {
			                           console.log(error);
			                     });
			}

			function getContacts() {
				return $http.get(GlobalAPI.url + 'users/' + SessionService.getUserName() + '/contacts')
			            		.then(function(response) {
			              			return response.data;
			            		})
			            		.catch(function(error) {
			              			console.log(error);
			            		});
			}


			function updateContact(id, contact) {
				//users/{username}/contacts/{contactid}
				return $http.post(GlobalAPI.url + 'users/' + SessionService.getUserName() + '/contacts/' + id, contact)
			            		.then(function(response) {
			            			console.log(response);
			              			return response;
			            		})
			            		.catch(function(error) {
			              			console.log(error);
			            		});
			}

			function addContact(newContact) {
				return $http.post(GlobalAPI.url + 'users/' + SessionService.getUserName() + '/contacts', newContact)
			            		.then(function(response) {
			              			return response;
			            		})
			            		.catch(function(error) {
			              			console.log(error);
			            		});
			}
			function deleteContact(id) {
				//users/{username}/contacts/{contactid}
				return $http.delete(GlobalAPI.url + 'users/' + SessionService.getUserName() + '/contacts/' + id)
			            		.then(function(response) {
			            			console.log(response);
			              			return response;
			            		})
			            		.catch(function(error) {
			              			console.log(error);
			            		});
			}


			function searchBusinesses() {

				//Query Example from API
				//api/search?categories={category}&text={searchText}&lat={latitude}&long={longitude}&maxDistance={maxDistance}&page={page}&take={take}
				return $http.get(GlobalAPI.url + 'search?searchText=White Widow')
		                         .then(function(response) {
		                               return response.data.results;
		                         })
		                         .catch(function(error) {
		                               console.log(error);
		                         });
		
			}

			function addBusiness(query) {

				return $http.post(GlobalAPI.url + 'businesses', query)
			                     .then(function(response) {
			                           return response;
			                     })
			                     .catch(function(error) {
			                           console.log(error);
			                     });

			}

			function uploadImage(file) {
		
				return $http.post('/api/images', file, 
					{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
					.then(function( response ) {
						return response;
					})
					.catch(function( error ) {
						return error;
					});
			}

			function addBusinessAd(query) {
				return $http.post('api/ad/', query)
                            	.then(function(response) {
                                    console.log(response);
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
			}

			function deleteBusinessAd(adId) {
				return $http.delete('api/ad/' + adId)
                            	.then(function(response) {
                                    console.log(response);
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
			}

			function geoFence(lat, lng) {

        		// return $http.get('/api/geo/capture?lat=' + lat + '&long=' + lng + '')
          		//       	.then(function(response) {
		        //             console.log(response);
		        //         })
		        //         .catch(function(error) {
		        //             console.log(error);
		        //         })


			}


		}////////////////End of APIService////////////////////

}());



