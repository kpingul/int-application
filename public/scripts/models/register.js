define([
    'jquery',
    'backbone',
    'cookie',
    'config'
], function($, Backbone, cookie, config) {
    var register = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            method: '',
            data: ''
        },
        sync: function() {
            if (this.get('method') == 'register')
            {
                var get_value = this.get('data');
                var final_json = get_value["params"];
                return $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: globalpath + 'users',
                    contentType: "application/json",
                    data: JSON.stringify(final_json),
                    success: function(response) {
                        console.log(response);
                        if (response["username"] != "") {
                            showSuccess("Successfully Registered, Please login to continue...");
                            setTimeout(function() {
                                Backbone.history.navigate('#login', true);
                            }, settimeout);
                        }
                    },
                    error: function(error) {
                        if (error["status"] == 400) {
                            showError(" Error in registration, please try again");
                        }
                    }
                });
            }
        }
    });
    return register;
});