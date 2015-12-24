(function() {
    'use strict';
    angular.module('iNeedTreez')
        
        .controller('LoginCtrl', LoginCtrl);

        LoginCtrl.$inject = ['$scope', 'AuthService', '$timeout', '$state','$element', '$rootScope', 'close'];

        function LoginCtrl($scope, AuthService, $timeout, $state, $element, $rootScope, close) {
            var vm = this;

            //sets the successful 
            //login status to false
            vm.successLogin = false;
            
            //sets the unsuccessful 
            //login status to false
            vm.badLogin = false;
            
            //sets the user credentials
            //information to empty
            vm.userCredentials = {
                username: "",
                password: ""
            }

            //method that calls AuthService
            //to authenticate user, set the
            //login attempt to successful or
            //unsuccessful, and redirects the 
            //user to the correct location 
            vm.loginUser = function() {

                //Calls the AuthService and passes the users
                //credentials into the parameters
                AuthService
                    .login(vm.userCredentials.username, vm.userCredentials.password)
                    .then(function(response) {
                        
                        //Checks if the response is available
                        if ( response ) {
                            //set the success login 
                            //attempt to true
                            vm.successLogin = true;

                            //empty out the username
                            //for security purposes 
                            vm.userCredentials.username = ""; 

                            //empty out the password
                            //for security purposes 
                            vm.userCredentials.password = "";
                            
                            //sets a timeout for 2 seconds
                            $timeout(function() {

                                //set the success login
                                //attempt to false
                                vm.successLogin = false;

                                //redirect user to the home
                                //page since the login attempt
                                //was successful
                                // $state.go('home');
                                $element.modal('hide');
                                
                                if( !$rootScope.returnToState ) {
                                
                                } else {
                                    
                                    $state.go($rootScope.returnToState);
                                }

                            }, 2000);

                        } else {
                            
                            //set the unsuccessful 
                            //login attempt to false
                            vm.badLogin = true;

                            //sets a timeout for 3 seconds
                            $timeout(function() {
                                //set the unsuccessful
                                //login attempt to true
                                vm.badLogin = false;
                              
                            }, 2000);
                        }
                    });

            }// end of loginUser method

        } ////////////////End of LoginCtrl////////////////////

}());