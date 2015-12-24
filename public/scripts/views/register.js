/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'config',
    'text!views/templates/register.html',
    'models/register'
], function($, _, cookie, Backbone, Bootstrap, config, registerTemplate, registerModel) {
    var register = Backbone.View.extend({
        el: 'body',
        template: _.template(registerTemplate),
        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },
        render: function() {
            if ($.cookie("access_token") && $.cookie("access_token") != "") {
                Backbone.history.navigate('#search', true);
                return false;
            }
            this.$el.html(this.template());
            $(".template_header").load("scripts/views/templates/base_templates/header_with_plus.html");
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html", function() {
                $(".footer").css({"position": "fixed", "bottom": "0px"});
            });
        },
        events: {
            'submit form': 'submit'
        },
        submit: function(e) {
            e.preventDefault();

            //***** Get Data *****//
            var username = this.$('input[name=username]').val();
            var password = this.$('input[name=password]').val();
            var confirm_password = this.$('input[name=confirm_password]').val();
            var email = this.$('input[name=email]').val();
            var fname = this.$('input[name=fname]').val();
            var lname = this.$('input[name=lname]').val();
            var postcode = this.$('input[name=postcode]').val();
            var country = this.$('input[name=country]').val();

            //***** Validations *****//
            if (ifBlank("Name", username) == false)
                return false;
            if (ifBlank("Password", password) == false)
                return false;
            if (ifBlank("Confirm Password", confirm_password) == false)
                return false;
            if (ifMatch("Passwords", password, confirm_password) == false)
                return false;
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Firstname", fname) == false)
                return false;
            if (ifBlank("Lastname", lname) == false)
                return false;
            if (ifBlank("Postcode", postcode) == false)
                return false;
            if (ifNumeric("Postcode", postcode) == false)
                return false;
            if (ifBlank("Country", country) == false)
                return false;

            //**** Create JSON ****//
            var params = {
                "username": username,
                "password": password,
                "email": email,
                "fName": fname,
                "lName": lname,
                "address": {
                    "postalCode": postcode,
                    "country": country
                }
            };
            var register = new registerModel({
                method: 'register',
                data: {
                    params: params
                }
            });
            register.save();
        }
    });
    return register;
});