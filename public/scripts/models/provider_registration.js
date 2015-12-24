define([
    'jquery',
    'backbone',
    'cookie'
], function($, Backbone, cookie) {
    var preg = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            method: '',
            data: ''
        },
        sync: function(method, model, options) {
            if (this.get('method') == 'pregistration')
            {
                var data_to_pass = this.get('data');
                return $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: globalpath + 'provider_register',
                    data: {user_email: data_to_pass['email'], user_name: data_to_pass['name'], address: data_to_pass['address']},
                    success: function(response) {
                        console.log(response);
                        if (response["log"] == "Successfully registered")
                        {
                            Backbone.history.navigate('thankyou', true);
                        }
//                        if (response["error"] == "zip not registered")
//                        {
//                            Backbone.history.navigate('provider_contact', true);
//                        }
//                        else
//                        {
//                            Backbone.history.navigate('provider_registration', true);
//                            $("#pr_city1").val(response["city"]);
//                            $("#pr_state1").val(response["state"]);
//                            $("#pr_zip1").val(data_to_pass['zip']);
//                        }
                        //$("html, body").animate({scrollTop: 0});
                        //if (data['status'] === 'true') {

                        //}
                    },
                    error: function(error)
                    {
                        alert("bye");
                        console.log(error);
                    }
                });
            }
        }
    });
    return preg;
});