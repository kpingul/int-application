define([
    'jquery',
    'backbone',
    'cookie'
], function($, Backbone, cookie) {
    var zip = Backbone.Model.extend({
        initialize: function() {
        },
        defaults: {
            method: '',
            data: ''
        },
        sync: function(method, model, options) {
            if (this.get('method') == 'check')
            {
                var data_to_pass = this.get('data');
                return $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: globalpath + 'check_zip',
                    data: {zip_code: data_to_pass['zip']},
                    success: function(response) {
                        console.log(response);
                        if (response["error"] == "zip not registered")
                        {
                            Backbone.history.navigate('provider_contact', true);
                            $(".alert-danger").html("Zip not found");
                            $(".alert-danger").show();
                            $("html, body").animate({scrollTop: 0});
                            setTimeout(function() {
                                $(".alert-danger").html("");
                                $(".alert-danger").hide();
                            }, 3000);
                            $(".zip_next_btn").html("NEXT");
                        }
                        else
                        {
                            Backbone.history.navigate('provider_registration', true);
                            $("#pr_city1").val(response["city"]);
                            $("#pr_state1").val(response["state"]);
                            $("#pr_zip1").val(data_to_pass['zip']);
                        }
                        //$("html, body").animate({scrollTop: 0});
                        //if (data['status'] === 'true') {

                        //}
                    },
                 error: function(error) { 
                     console.log("in prfile error");
                     getAccessToken();
                    console.log(error);
                    showError(error);
                }
                });
            }
        }
    });
    return zip;
});