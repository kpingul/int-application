/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'text!views/templates/menu.html'
], function($, _, cookie, Backbone, Bootstrap, menuTemplate) {
    var menu = Backbone.View.extend({
        el: 'body',
        template: _.template(menuTemplate),
        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },
        render: function() {

            this.$el.html(this.template());
            if ($.cookie("access_token")) {
                $(".template_header").load("scripts/views/templates/base_templates/header_loggedin.html", function() {
                    $("#admin_name").html($.cookie("username"));
                });
            }
            else {
                $(".template_header").load("scripts/views/templates/base_templates/header_with_login.html");
            }
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html");
            $(".address").html($.cookie("business_address"));
            $(".name").html($.cookie("bussiness_name"));

            var contact = $.cookie("bussiness_name") + "&&&" + $.cookie("phone")
            $(".add_contact").attr("id", contact);
            var website = $.cookie("website");
            $(".website").html(website)

            /* *******************************************************************************
             View All Menu
             ******************************************************************************** */
            $.ajax({
                type: 'GET',
                url: globalpath + 'menu/55a8f91d8b70fff4391cc70e',
                contentType: "application/json",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $.cookie("access_token"));
                },
                success: function(response) {
                    console.log("viewmenuresponse");
                    console.log(response);
                    //return false;
                    if (response) {
                        var str = '';
                        var length = response.length;
                        for (var i = 0; i < length; i++) {
                            var menu_count = i + 1
                            var menu_name = "Menu" + menu_count;
                            var category_length = response[i]["categories"].length;
                            var menu_id = response[i]["_id"];
                            if (category_length == 0) {

                            }
                            else {
                                var category_name = response[i]["categories"][0]["name"];
                                var picture = response[i]["categories"][0]["picture"];
                                var menu_id = response[i]["_id"];
                                var item = response[i]["categories"][0]["items"];
                                console.log("item")
                                console.log(item.length)
                                str += '<li class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'
                                str += '<div class="profile_image">';
                                str += '<img width="100px" src="' + picture + '"/>';
                                str += '</div>';
                                str += '<h2>' + category_name + '</h2>';
                                str += '<ul>';
                                for (var j = 0; j < item.length; j++) {
                                    var items = response[i]["categories"][0]["items"][j];
                                    console.log("items in loop")
                                    console.log(items)
                                    str += '<li><a href="">' + items + '</a></li>';
                                    console.log(str)
                                }

                                str += '</ul>';
                                str += '</li>';
                            }
                        }
                        $(".menu_details").html(str)

                    }
                },
                error: function(error) {
                    console.log("in prfile error");
                    getAccessToken();
                    console.log(error);
                    showError(error);
                }

            });


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
        events: {
            'click .add_contact': 'addContact',
     'click .website': 'website'
        },
        addContact: function(e) {
console.log("in contact")
            var contact_name = $(e.currentTarget).attr("id").split("&&&")[0];
            var contact_phone = $(e.currentTarget).attr("id").split("&&&")[1];
//        var contact_phone =  $.cookie("phone")
//         var contact_name =  $.cookie("name")
            var username = $.cookie("username")
            var params = {
                "name": contact_name,
                "phone": contact_phone
            }
            $.ajax({
                type: 'POST',
                url: globalpath + 'users/' + username + '/contacts',
                contentType: "application/json",
                data: JSON.stringify(params),
                beforeSend: function(xhr, settings) {
                    $(".add_ads").hide();
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $.cookie("access_token"));
                },
                success: function(response) {
                    console.log("responsemenu");
                    console.log(response);

                    showSuccess("Contact created successfully");
                    setTimeout(function() {
                        window.location.href = "admin/contact.html";
                    }, settimeout);


                },
                error: function(error) {
                    console.log("in prfile error");
                    getAccessToken();
                    console.log(error);
                    showError(error);
                }
            });

        },
         website: function() { 
              var url = $.cookie("website");
 window.open(url, '_blank');
         }

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
    return menu;
});