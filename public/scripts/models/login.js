define([
    'jquery',
    'backbone',
    'cookie'
], function($, Backbone, cookie) {
    var login = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            method: '',
            data: ''
        },
        sync: function(method, model, options) {
            if (this.get('method') == 'login_fb')
            {
                var get_value = this.get('data');
              
                return $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: globalpath + 'auth/oauth/token',
                    contentType: "application/json",
                    data: JSON.stringify(get_value),
                    success: function(response) {
                        console.log(response);
                        //return false;
                        if (response["access_token"] != "") {
                            $.cookie("access_token", response["access_token"]);
                            $.cookie("refresh_token", response["refresh_token"]);
                            console.log("Access_token:  " + response["access_token"]);
                            $.cookie("user_id", response["user"]["_id"]);
                            $.cookie("username", response["user"]["username"]);
                            showSuccess("Successfully Loggin in...");
                            setTimeout(function() {
                                if ($.cookie("search_string")) {
                                    Backbone.history.navigate('#search', true);
                                }
                                else {
                                    Backbone.history.navigate('', true);
                                }
                            }, settimeout);

                        }
                    },
                    error: function(error) {
                        console.log(error)
                        //showError(error["responseJSON"]["error_description"]);
                    }

                });
            }
        }
    });
    return login;
});