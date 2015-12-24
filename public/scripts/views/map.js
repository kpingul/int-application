/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'text!views/templates/map.html'
], function($, _, cookie, Backbone, Bootstrap, mapTemplate) {
    var map = Backbone.View.extend({
        el: 'body',
        template: _.template(mapTemplate),
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
             var contact =  $.cookie("bussiness_name")+ "&&&"+ $.cookie("phone")
            $(".add_contact").attr("id",contact);
            var website = $.cookie("website");
            $(".website").html(website)

            L.mapbox.accessToken = 'pk.eyJ1IjoibG9rZXNoLWJhbnNhbCIsImEiOiJhMjgyN2M1MDY3YjNiYjdiN2NiYjNhZmJjNmMyYzQ1NiJ9.lyrd8YhsRoxcq2bn7-M60A';
            
            var bussiness_lat = $.cookie("bussiness_lat");
            var bussiness_long = $.cookie("bussiness_long");
            var map = L.mapbox.map('map', 'mapbox.streets')
                    .setView([bussiness_lat, bussiness_long], 12);
            var marker = L.marker([bussiness_lat, bussiness_long], {
                icon: L.mapbox.marker.icon({
                    'marker-color': '#f86767'
                }),
                zoom: 13,
                draggable: false
            }).addTo(map);

        },  
                
                
                  events: {
             'click .add_contact': 'addContact',
      'click .website': 'website'
        },
        addContact: function(e) { 
            
             var contact_name = $(e.currentTarget).attr("id").split("&&&")[0];
              var contact_phone = $(e.currentTarget).attr("id").split("&&&")[1];
//        var contact_phone =  $.cookie("phone")
//         var contact_name =  $.cookie("name")
         var username =  $.cookie("username")
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
                            window.location.href ="admin/contact.html";
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
    return map;
});