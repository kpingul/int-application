/*-------------------Add New Charge View-----------------*/
define([
    'jquery',
    'underscore',
    'cookie',
    'backbone',
    'bootstrap',
    'tubular',
    'text!views/templates/home.html'
], function($, _, cookie, Backbone, Bootstrap, tubular, indexTemplate) {

    var latitude, longitude;
    var homeUser = Backbone.View.extend({
        el: 'body',
        template: _.template(indexTemplate),
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
//                    console.log("categories");
//                    console.log(response);
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


            $("#freewall .brick").hover(function() {
                $(this).children(".content").animate({
                    left: '0px'
                }, 1);
            });
            $("#freewall .brick").mousemove(function() {
                $(this).children(".content").animate({
                    left: '0px'
                }, 1);
            });

            $("#freewall .brick").mouseout(function() {
                $(this).children(".content").animate({
                    left: '-100%'
                }, 1);
            });


            // $("select.category").html(global_category);

            //**** Start Video ****//
            $('#wrapper').tubular({videoId: 'mzrwYwuEu2c'});
            //**** End Video ****//

            if ($.cookie("access_token")) {
                $(".template_header").load("scripts/views/templates/base_templates/header_loggedin.html", function() {
                    $("#admin_name").html($.cookie("username"));
                });
            }
            else {
                $(".template_header").load("scripts/views/templates/base_templates/header_with_login.html");
            }
            $(".template_footer").load("scripts/views/templates/base_templates/footer.html");

        },
        events: {
            'click .search_scrn': 'searchBtn',
            'mouseover .geocomplete': 'createGeoComplete',
            // 'click select.category': 'getCategories',
            'change select.category': 'getSubCategories'
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
////            if (ifBlank("Zipcode", zip) == false)
////                return false;
////            if (ifNumeric("Zipcode", zip) == false)
////                return false;
//            if (ifBlank("Address", address) == false)
//                return false; 


            if (category == "" && sub_category == "" && address == "") {
                showError("All fields can't left blank");
                return false;
            }
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
            //return false;
              var url = "search";
            //var url = "search?categories=" + category + "&text=" + sub_category + "&lat=" + latitude + "&long=" + longitude + "&maxDistance=2000&take=20&page=1";
            $.cookie("search_string", url);
            $.cookie("active_page", 1);
            Backbone.history.navigate('#search', true);
        },
        createGeoComplete: function() {
            $(".geocomplete").geocomplete();
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
                }
            });





//            if (category == 1) {
//                $("select.sub_category").html(sub_category1);
//            }
//            else if (category == 2) {
//                $("select.sub_category").html(sub_category2);
//            }
//            else if (category == 3) {
//                $("select.sub_category").html(sub_category3);
//            }
//            else if (category == 4) {
//                $("select.sub_category").html(sub_category4);
//            }
//            else {
//                $("select.sub_category").html("<option value=''>No Sub Category Found</option>");
//            }
        }



//        getAddressByZip: function() {
//            $(".location").val("");
//            var zip = $(".zip").val();
//            if (ifBlank("Zipcode", zip) == false)
//                return false;
//            if (ifNumeric("Zipcode", zip) == false)
//                return false;
//            var res = getLatLongByAddress(zip);
//            res = res.responseJSON;
//            console.log(res);
//            if (res["status"] == "OK") {
//                var lenn = res["results"][0]["address_components"].length;
//                var city, state;
//                for (var i = 0; i < lenn; i++) {
//                    if (res["results"][0]["address_components"][i]["types"][0] == "locality") {
//                        city = res["results"][0]["address_components"][i]["long_name"];
//                    }
//                    if (res["results"][0]["address_components"][i]["types"][0] == "administrative_area_level_1") {
//                        state = res["results"][0]["address_components"][i]["long_name"];
//                    }
//                    if (res["results"][0]["address_components"][i]["types"][0] == "administrative_area_level_2") {
//                        var back_state = res["results"][0]["address_components"][i]["long_name"];
//                    }
//                    if (i == (lenn - 1) && (city == "" || city == null)) {
//                        city = back_state;
//                    }
//                    if (i == (lenn - 1) && (state == "" || state == null)) {
//                        state = back_state;
//                    }
//                }
//                var final_location = '';
//                if (city != "") {
//                    if (state != "") {
//                        final_location = city + ", " + state;
//                    }
//                    else {
//                        final_location = city;
//                    }
//                }
//                else {
//                    final_location = state;
//                }
//                $(".location").val(final_location);
//                latitude = res.results[0].geometry.location.lat;
//                longitude = res.results[0].geometry.location.lng;
//            }
//            else {
//                $(".zip").val("");
//                latitude = '';
//                longitude = '';
//                showError("Please enter a valid zipcode");
//                return false
//            }
//        }
    });
    return homeUser;
});