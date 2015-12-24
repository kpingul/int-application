/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'text!views/templates/profile.html'
], function($, _, cookie, Backbone, Bootstrap, profileTemplate) {
    var profile = Backbone.View.extend({
        el: 'body',
        template: _.template(profileTemplate),
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
            var business_id = $.cookie("business_id");
           var contact =  $.cookie("bussiness_name")+ "&&&"+ $.cookie("phone")
            $(".add_contact").attr("id",contact) 
            var website = $.cookie("website");
            $(".website").html(website)

            /* *******************************************************************************
             View All Ads
             ******************************************************************************** */
            $.ajax({
                type: 'GET',
//            url: globalpath + 'ad/'+business_id,
                url: globalpath + 'ad/55a8f91d8b70fff4391cc70e',
                contentType: "application/json",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $.cookie("access_token"));
                },
                success: function(response) {
                    console.log("response_profile");
                    console.log(response);
                    
                    if (response) {
                        var str = '';
                        var length = response.length;
                        for (var i = 0; i < length; i++) {
                            var image = response[i]["imageUrl"];  
                            if ( i == 0){ 
                                var image = response[0]["imageUrl"];  
                            str +=' <li><a href="'+image+'" title="caption of the picture" rel="prettyPhoto[gallery1]" ><img src="'+image +'"/></a></li>';

                            }
                            else{
                           str +=' <li><a href="'+image+'" rel="prettyPhoto[gallery1]" ></a></li>';
                       }
//                             str +=' <li><a href="'+image+'" title="caption of the picture" rel="prettyPhoto[gallery1]" ><img src="'+image +'"/></a></li>';
                     //str +='<li><a href="images/slide1.jpg" rel="prettyPhoto[gallery1]" ><img src="images/slide1.jpg"/></a></li>';
          
                        } 
                        $("ul.gallery").html(str);
                        
                        
                        $("area[rel^='prettyPhoto']").prettyPhoto();
        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed: 'normal', theme: 'light_square', slideshow: 3000, autoplay_slideshow: false});
        $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed: 'fast', slideshow: 10000, hideflash: true});
          $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
            custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
            changepicturecallback: function() {
                initialize();
            }
        });
        $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
            custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
            changepicturecallback: function() {
                _bsap.exec();
            }
        });
            window.prettyPrint && prettyPrint();
$('.flexslider').flexslider({
            animation: "slide",
            start: function(slider) {
                $('body').removeClass('loading');
            }
        }); 
                        
//                        $("tbody.ad_view").html(str);
//                        $("#example").dataTable();
                    }
                    else {
                        showError(response["error"]);
                    }
                },
                error: function(error) { 
                     console.log("in prfile error");
                     getAccessToken();
                    console.log(error);
                    showError(error);
                }
            }); 
            

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
            
            
            
//    window.location.href="#profile"
//                var user = new userModel({
//                    method: 'update',
//                    data: {first_name: $('#first_name').val(), last_name: $('#last_name').val(), city: $('#user_city').val(), zip: $('#user_zip').val(),state:$('#user_state :selected').val()}
//                });
//                user.save();
        } ,
        
         website: function() { 
             window.location.href =$.cookie("website")
         }
    });
    return profile;
});