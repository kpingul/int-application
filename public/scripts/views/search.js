/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'config',
    'models/search',
    'text!views/templates/search.html'
], function($, _, cookie, Backbone, Bootstrap, config, searchPlacesModel, searchTemplate) {
    var latitude, longitude;
    var search = Backbone.View.extend({
        el: 'body',
        template: _.template(searchTemplate),
        initialize: function(options) {
            this.options = options;
            _.bindAll(this, 'render');
        },
        render: function() {

            this.$el.html(this.template());

            $.ajax({
                dataType: 'JSON',
                type: 'GET',
                url: globalpath + 'businesses/categories',
                success: function(response) {
                    var global_category
                    global_category += '<option mydata="1" value="">Choose One</option>';
                    console.log(response);
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
                                var name = response[i]["name"]
                                console.log(name)
                                global_category += '<option mydata="' + name + '" value="' + name + '">' + name + '</option>';
                            }
                        }
                        $("select.category").html(global_category);

                    }
                },
                error: function(error) {
                    console.log("in prfile error");
                    getAccessToken();
                    console.log(error);
                    showError(error);
                }
            });


            //$("select.category").html(global_category);
            //====FlexSlider====//
            $('.flexslider').flexslider({
                animation: "slide",
                start: function(slider) {
                    $('body').removeClass('loading');
                }
            });
            //====FlexSlider====//
            if ($.cookie("access_token")) {
                $(".template_header").load("scripts/views/templates/base_templates/header_loggedin.html", function() {
                    $("#admin_name").html($.cookie("username"));
                });
            }
            else {
                $(".template_header").load("scripts/views/templates/base_templates/header_with_login.html");
            }
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html");
            if ($.cookie("search_string")) {
                var search = new searchPlacesModel({
                    method: 'search_places',
                    data: $.cookie("search_string")
                });
                search.save();
            }

        },
        events: {
            'click .search_scrn': 'searchBtn',
            'mouseover .geocomplete': 'createGeoComplete',
            'click .pagination_btns li.pages': 'getCurrentPage',
            'click .prev': 'previous',
            'click .next': 'next',
            'change select.category': 'getSubCategories',
            'click .particular_bussiness': 'particularBussiness'
                    //'blur .zip': 'getAddressByZip'
        },
        searchBtn: function() {
            var category = $(".category option:selected").val();
            var sub_category = $(".sub_category option:selected").val();
            //var zip = $(".zip").val();
            var address = $(".geocomplete").val();
            //var complete_address = address + ", " + zip;
            //***** Validations *****//
//            if (ifBlank("Category", category) == false)
//                return false;
//            if (ifBlank("Sub Category", sub_category) == false)
//                return false;
//            if (ifBlank("Zipcode", zip) == false)
//                return false;
//            if (ifNumeric("Zipcode", zip) == false)
//                return false;
//            if (ifBlank("Address", address) == false)
//                return false;

          if  (address != ""){
            var res = getLatLongByAddress(address);
            if (res.responseJSON.status == "ZERO_RESULTS") {
                showError("Please enter a valid address or zipcode");
                return false
            } 

            latitude = res.responseJSON.results[0].geometry.location.lat;
            longitude = res.responseJSON.results[0].geometry.location.lng;
            }
            else{
               latitude ="" ;
               longitude ="";
            }

//            console.log(category);
//            console.log(complete_address);
//            console.log(latitude);
//            console.log(longitude);
             var url = "search";
            //var url = "search?categories=" + category + "&text=" + sub_category + "&lat=" + latitude + "&long=" + longitude + "&maxDistance=2000&take=20&page=1";
            $.cookie("search_string", url);
            $.cookie("active_page", 1);
            if ($.cookie("search_string")) {
                var search = new searchPlacesModel({
                    method: 'search_places',
                    data: url
                });
                search.save();
            }
        },
        createGeoComplete: function() {
            $(".geocomplete").geocomplete();
        },
        getCurrentPage: function(e) {
            var page = $(e.currentTarget).html();
            var url = $.cookie("search_string").split("&page=")[0] + "&page=" + page;
            $.cookie("search_string", url);
            $.cookie("active_page", page);
            if ($.cookie("search_string")) {
                var search = new searchPlacesModel({
                    method: 'search_places',
                    data: url
                });
                search.save();
            }
        },
        previous: function() {
            var i = $(".active").index();
            i--;
            //==== Call For Previous Record====//
            var page = parseInt(i) + 1;
            if (page >= 1) {
                $(".active").removeClass('active');
                $('.pagination_btns li').eq(i).addClass('active');
                var url = $.cookie("search_string").split("&page=")[0] + "&page=" + page;
                $.cookie("search_string", url);
                $.cookie("active_page", page);
                if ($.cookie("search_string")) {
                    var search = new searchPlacesModel({
                        method: 'search_places',
                        data: url
                    });
                    search.save();
                }
            }
        },
        next: function() {
            var i = $(".active").index();
            i = i >= $('li').length - 1 ? 0 : i + 1;
            $(".active").removeClass('active');
            $('.pagination_btns li').eq(i).addClass('active');

            //==== Call For Next Record====//
            var page = parseInt(i) + 1;
            var url = $.cookie("search_string").split("&page=")[0] + "&page=" + page;
            $.cookie("search_string", url);
            $.cookie("active_page", page);
            if ($.cookie("search_string")) {
                var search = new searchPlacesModel({
                    method: 'search_places',
                    data: url
                });
                search.save();
            }
        },
        getSubCategories: function() {
            var category = $(".category option:selected").attr("mydata");
            console.log(category)
            $.ajax({
                dataType: 'JSON',
                type: 'GET',
                url: globalpath + 'businesses/categories',
                //data: {user_email: data_to_pass['email'], user_name: data_to_pass['name'], address: data_to_pass['address']},
                success: function(response) {
                    var global_category
                    console.log(response);
                    // return false;
                    if (response)
                    {
                        var length = response.length
                        for (var i = 0; i < length; i++)
                        {
                            if ("," + category + "," == response[i]["path"])
                            {
                                var name = response[i]["name"]
                                console.log(name)
                                global_category += '<option mydata="' + name + '" value="' + name + '">' + name + '</option>';
                            }
                            else
                            {

                            }
                        }
                        $("select.sub_category").html(global_category);
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
        particularBussiness: function(e) {
            // var category = $(".category option:selected").attr("mydata");
            console.log("category")
            var mydata = $(e.currentTarget).attr("mydata")
            console.log(mydata)
            var data = mydata.split("&&&")
            $.cookie("bussiness_name", data[0]);
            $.cookie("bussiness_lat", data[1]);
            $.cookie("bussiness_long", data[2]);
            $.cookie("business_address", data[3])
            $.cookie("business_id", data[4])
            $.cookie("phone", data[5]) 
            $.cookie("website", data[6])
            window.location.href = "#profile"
            // console.log(data)
//            $.ajax({
//                dataType: 'JSON',
//                type: 'GET',
//                url: globalpath + 'businesses/categories',
//                //data: {user_email: data_to_pass['email'], user_name: data_to_pass['name'], address: data_to_pass['address']},
//                success: function(response) {
//                    var global_category
//                    console.log(response);
//                    // return false;
//                    if (response)
//                    {
//                        var length = response.length
//                        for(var i =0;i<length;i++)
//                        {
//                            if (","+category+"," == response[i]["path"])
//                            {
//                                var name =response[i]["name"]
//                                console.log(name)
//                                global_category += '<option mydata="'+name+'" value="'+name+'">'+name+'</option>';
//                            }
//                            else
//                            {
//
//                            }
//                        }
//                        $("select.sub_category").html(global_category);
//                    }
//                }
//            });

        }
    });
    return search;
});