/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'text!views/templates/message.html'
], function($, _, cookie, Backbone, Bootstrap, messageTemplate) {
    var message = Backbone.View.extend({
        el: 'body',
        template: _.template(messageTemplate),
        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },
        render: function() {

            this.$el.html(this.template());
            $(".template_header").load("scripts/views/templates/base_templates/header_with_plus.html");
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html");
            //var that = this;
            // var details = new userDetailsCollection();

//            details.fetch({data: {access_token: $.cookie('user_access_token'), user_id: $.cookie('edit_user_id')}, 'type': 'POST', reset: true, success: function(details)
//                {
//                    var template = _.template(editTemplate, {details: details.models});
//                    that.$el.html(template);
//                    var state = details.models[0]['attributes']['state'];
//                    $("#user_state option[value='"+state+"']").attr("selected", "selected");
//                    return this;
//                }
//            });
        },
//        events: {
//             'click .particular-search': 'particularSearch'
//        },
//        particularSearch: function() {
//    window.location.href="#profile"
//                var user = new userModel({
//                    method: 'update',
//                    data: {first_name: $('#first_name').val(), last_name: $('#last_name').val(), city: $('#user_city').val(), zip: $('#user_zip').val(),state:$('#user_state :selected').val()}
//                });
//                user.save();
//        }
    });
    return message;
});