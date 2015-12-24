/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'config',
    'text!views/templates/login.html',
    'models/login'
], function($, _, cookie, Backbone, Bootstrap, config, loginTemplate, loginFBModel) {
    var homeUser = Backbone.View.extend({
        el: 'body',
        template: _.template(loginTemplate),
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
            'submit form': 'submit',
            'click #register': 'registerPage'
        },
        submit: function(e) {
            e.preventDefault();
            var username = this.$('input[name=email]').val();
            var password = this.$('input[name=password]').val();
            if (ifBlank("Username", username) == false)
                return false;
            if (ifBlank("Password", password) == false)
                return false;
            var loginFB = new loginFBModel({
                method: 'login_fb',
                data: {client_id: "iNeedTreezWebv1", client_secret: "LCeerVeAGDcaHY8z4v4tXprPQv", grant_type: "password", username: username, password: password}
            });
            loginFB.save();
        },
        registerPage: function() {
            window.location.href = "#register"
        }

    });
    return homeUser;
});