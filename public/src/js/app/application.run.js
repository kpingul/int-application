(function() {
	'use strict';
	angular.module('iNeedTreez')
		.run(['$rootScope','UserService','AuthService', 'SessionService', '$state','ModalService', function ($rootScope, UserService,AuthService,SessionService, $state, ModalService) {

			//**
			//Although $rootScope is bad practice, I'm not storing
			//any data at the rootscope but rather making sure the 
			//authentication and session services are available
			//across the application for resuability and 
			//a cleaner Auth and Session API
			$rootScope.auth = AuthService;
			$rootScope.session = SessionService;

			//quick fix when the browser initially reloads and transitions
			//to different states, it gets automatically positioned at the top
			//when the state successfully changes
			$rootScope.$on('$stateChangeSuccess',function(){
				$("html, body").animate({ scrollTop: 0 }, 0);
				$('body').css('overflow-y', 'hidden');
			});

			//checks for authentication if the state recommends the user to be authenticated
			//sync with UI router authenticate set to true
			$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		    	if (toState.authenticate && !AuthService.isLoggedIn()){
			        // User isn’t authenticated

		    		//return to state caches last requested state for uer
		    		$rootScope.returnToState = toState.name;
		    		
		    		//call modal service for login validation
				  	ModalService.showModal({
				     	templateUrl: "src/js/app/login/login.tpl.html",
				    	controller: "LoginCtrl",
				    	controllerAs: 'vm'
				   
				    }).then(function(modal) {
				    	modal.element.modal();
				   		
				    });

				 	event.preventDefault(); 
      			}
		    });
		}])
	
}());