buildmdefine([
    'jquery',
    'backbone',
    'cookie'
], function($, Backbone, cookie) {

    var locations = [];
    var sub_category_name;

    function buildMap() {

        document.getElementById('loadMap').innerHTML = "<div id='map' style='width: 100%; height: 450px;'></div>";
        $("#map").css("height", $(window).height() + "px");
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttribution = 'Map data ? <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});

        L.mapbox.accessToken = 'pk.eyJ1IjoibG9rZXNoLWJhbnNhbCIsImEiOiJhMjgyN2M1MDY3YjNiYjdiN2NiYjNhZmJjNmMyYzQ1NiJ9.lyrd8YhsRoxcq2bn7-M60A';

        var map = L.mapbox.map('map', 'mapbox.streets').setView([[51.505, -0.09], [51.505, -0.09], 10);
        map.addLayer(osmLayer);



    


        }
    }



    var search = Backbone.Model.extend({
        initialize: function() {

        },
        defaults: {
            method: '',
            data: ''
        },
        sync: function(method, model, options) {
            if (this.get('method') == 'search_places')   
            {
                var get_value = this.get('data');
                console.log("in modal")
                console.log(get_value)
                return $.ajax({
                    dataType: 'JSON',
                    type: 'GET',
                    url: globalpath + get_value,
                    beforeSend: function() {
                        $(".loader").show();
                    },
                    contentType: "application/json",
                    success: function(response) { 
                        console.log("response_search");
                        console.log(response);
                        $(".loader").hide();
                        var count = response["meta"]["totalCount"];
                        var result_length = response["results"].length;
                        console.log(result_length)
                        console.log("result_length")

                        var str = '';
                        locations = [];
                        if (result_length > 0) { 
                            console.log("in rtesult set");
                            for (var i = 0; i < result_length; i++) {  
                                console.log("in rtesult set loop");
                                var singleRecord = [];
                                var name = response["results"][i]["name"];
                                singleRecord.push(name);buildm
                                if (response["results"][i]["address"]) { 
                                    console.log("result_length loc")
                                    var lat = response["results"][i]["address"]["lat"];
                                    var long = response["results"][i]["address"]["long"];
                                    var city = response["results"][i]["address"]["city"];
                                    var country = response["results"][i]["address"]["country"];
                                    var postalCode = response["results"][i]["address"]["postalCode"];
                                    var state = response["results"][i]["address"]["state"];
                                    var street = response["results"][i]["address"]["street"];
                                     var business_id = response["results"][i]["_id"];
                                     var phone = response["results"][i]["phone"];
                                     var business_website =response["results"][i]["website"];
                                    var address = street + " " + city + " " + state + " " + country + " " + postalCode;
                                    if (response["results"][i]["categories"].length >0)
                                    sub_category_name = response["results"][i]["categories"][0]["name"]
                                    console.log("sub_category_name")
                                    console.log(sub_category_name) 
                                    console.log(business_website)

                                    //console.log(address)
                                    singleRecord.push(lat);
                                    singleRecord.push(long);
                                }
                                else {
                                    singleRecord.push("0");
                                    singleRecord.push("0");
                                }
                                singleRecord.push(parseInt(i) + 1);
                                locations.push(singleRecord);
                                var short_name = name.length;
                                if (short_name > 22) {
                                    short_name = name.substr(0, 22) + '...';
                                }
                                else {
                                    short_name = name;
                                }
                                str += '<li class="col-lg-6 col-md-6 col-sm-6 col-xs-12 particular-search">';
                                str += '<div class="box">';
                                str += '<div class="uper"> <a href="javascript:;" class="particular_bussiness" mydata ="' + name + '&&&' + lat + '&&&' + long + '&&&' + address + '&&&' + business_id  + '&&&' + phone  +'&&&'+ business_website +'" ><img src="images/product 1.jpg" title="" alt=""></div></a>';
                                str += '<div class="content">';
                                str += '<div class="like"><i class="fa fa-plus-circle"></i></div>';
//                                str += '<div class="price"><i class="fa fa-usd"></i>4700</div>';
                                str += '</div>';
                                str += '</div>';
                                str += '<div class="bottom"> <a href="javascript:;" class="particular_bussiness" mydata ="' + name + '&&&' + lat + '&&&' + long + '&&&' + address + '&&&' + business_id + '&&&' + phone +'&&&' + business_website +'"><img src="images/peron.jpg" title="' + name + '" alt=""></a>';
                                str += '<h3 title="' + name + '">' + short_name + '</h3>';
//                                str += '<p>Private room  135 reviews  Mission District</p>';
                                str += '</div>';
                                str += '</div>';
                                str += '</li>';
                            }
                        }
                        else {
                            str += '<p style="text-align: center;">Sorry! No records found.</p>';
                        }
                        $(".search_result ul").html(str);

                        // =========mapbox=========== 
                        buildMap();

                        //===== Google Maps====// 
                        //console.log(locations);
//                        $("#map").css("height", $(window).height() + "px");
//                        var locations = [
//                            ['Bondi Beach', -117.295904, 151.274856, 4],
//                            ['Coogee Beach', -33.923036, 151.259052, 5],
//                            ['Cronulla Beach', -34.028249, 151.157507, 3],
//                            ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//                            ['Maroubra Beach', -33.950198, 151.259302, 1]
//                        ];

//                        var map = new google.maps.Map(document.getElementById('map'), {
//                            zoom: 12,
//                            center: new google.maps.LatLng(locations[1][1], locations[1][2]),
//                            mapTypeId: google.maps.MapTypeId.ROADMAP
//                        });
//
//                        var infowindow = new google.maps.InfoWindow();
//
//                        var marker, i;
//                        //console.log(locations.length);
//                        for (i = 0; i < locations.length; i++) {
//                            //console.log("lat:  " + locations[i][1]);
//                            //console.log("long:  " + locations[i][2]);
//                            marker = new google.maps.Marker({
//                                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//                                map: map
//                            });
//
//                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
//                                return function() {
//                                    infowindow.setContent(locations[i][0]);
//                                    infowindow.open(map, marker);
//                                }
//                            })(marker, i));
//                        } 

                        //===== Pagination ====//
                        var pages = '';
                        count = Math.ceil(count / 20);
                        pages += '<span class="prev">prev</span>';
                        pages += '<ul id="itemContainer">';
                        for (var j = 1; j <= count; j++) {
//                            pages += '<a href="javascript:" id="page' + j + '" class="pages">' + j + '</a>';
                            pages += '<li id="page' + j + '" class="pages">' + j + '</li>';
                        }
                        pages += '</ul>';
                        pages += '<span class="next">next</span>';
                        $(".pagination_btns").html(pages);
                        $("#page" + $.cookie("active_page")).addClass("active");

                        if ($.cookie("active_page") >= 7 && $.cookie("active_page") <= 12) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 24);
                        }
                        else if ($.cookie("active_page") >= 12 && $.cookie("active_page") <= 18) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 48);
                        }
                        else if ($.cookie("active_page") >= 19 && $.cookie("active_page") <= 24) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 72);
                        }
                        else if ($.cookie("active_page") >= 25 && $.cookie("active_page") <= 30) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 96);
                        }
                        else if ($.cookie("active_page") >= 31 && $.cookie("active_page") <= 36) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 120);
                        }
                        else if ($.cookie("active_page") >= 37 && $.cookie("active_page") <= 42) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 144);
                        }
                        else if ($.cookie("active_page") >= 43 && $.cookie("active_page") <= 48) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 168);
                        }
                        else if ($.cookie("active_page") >= 49 && $.cookie("active_page") <= 54) {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 192);
                        }
                        else {
                            $("#itemContainer").scrollTop($("#itemContainer").scrollTop() + 0);
                        }

                        return false;
                    },
                    error: function(error) { 
                console.log("in error")
                       getAccessToken()
                        console.log("in error")
                        console.log("error");
                        showError("oops! Something wrong happen");
                    }

                });
            }
        }
    });
    return search;
});