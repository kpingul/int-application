/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'text!views/templates/business_type.html'
], function($, _, cookie, Backbone, Bootstrap, businessTemplate) {
    var business = Backbone.View.extend({
        el: 'body',
        template: _.template(businessTemplate),
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
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html", function() {
                $(".footer").css({"position": "fixed", "bottom": "0px"});
            });
            $.ajax({
                dataType: 'JSON',
                type: 'GET',
                url: globalpath + 'businesses/categories',
                success: function(response) {
                    console.log("response");
                    console.log(response);
                    var str = '';
                    if (response)
                    {
                        var length = response.length
                        for (var i = 0; i < length; i++)
                        {
                            if (response[i]["path"])
                            {

                            }
                            else
                            {
                                var image = response[i]["imageUrl"];
                                var name = response[i]["name"];
                                var id = response[i]["_id"];
                                str += '<li class="col-lg-3 col-md-3 col-sm-6 col-xs-12">';
                                str += '<p class="add_business" id ="' + id + '">' + name + '</p> ';
                                str += '<a href="javascript:;"><img style="  margin-top: 28px;width:100px;" src="' + image + '">';
                                str += ' </a>'
//                                str += '<img class="on_hover" src="images/icon2_b.png">'
                                for (var j = 0; j < length; j++)
                                {
                                    if (response[j]["path"])
                                    {
                                        if ("," + name + "," == response[j]["path"])
                                        {
                                            var sub_category = response[j]["name"];
                                            var id = response[j]["_id"];
                                            str += '<span  class="add_business" id ="' + id + '">' + sub_category + '</span> '
                                        }
                                    }
                                    else {

                                    }
                                }

                                str += '</li>'
                            }
                        }
                        $("ul.categories_subcategories_data").html(str);

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
            'click .add_business': 'addBusiness'
        },
        addBusiness: function(e) {
            var id = $(e.currentTarget).attr("id")
            console.log("id");
            console.log(id);
            $.cookie("category_id",id)
            window.location.href = "admin/business.html?id=" + id + " "
        }
    });
    return business;
});