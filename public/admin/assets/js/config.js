$(document).ready(function() {
    $("#header").load("header.html")
    $(".common_sidebar").load("sidebar.html")
    $(".common_footer").load("footer.html")

})
globalpath = "http://ineedtreez-dev.azurewebsites.net/api/";
settimeout = 3000;
global_business_hours = '';

global_business_hours += '<option value="01:00">01:00</option>';
global_business_hours += '<option value="01:30">01:30</option>';
global_business_hours += '<option value="02:00">02:00</option>';
global_business_hours += '<option value="02:30">02:30</option>';
global_business_hours += '<option value="03:00">03:00</option>';
global_business_hours += '<option value="03:30">03:30</option>';
global_business_hours += '<option value="04:00">04:00</option>';
global_business_hours += '<option value="04:30">04:30</option>';
global_business_hours += '<option value="05:00">05:00</option>';
global_business_hours += '<option value="05:30">05:30</option>';
global_business_hours += '<option value="06:00">06:00</option>';
global_business_hours += '<option value="06:30">06:30</option>';
global_business_hours += '<option value="07:00">07:00</option>';
global_business_hours += '<option value="07:30">07:30</option>';
global_business_hours += '<option value="08:00">08:00</option>';
global_business_hours += '<option value="08:30">08:30</option>';
global_business_hours += '<option value="09:00">09:00</option>';
global_business_hours += '<option value="09:30">09:30</option>';
global_business_hours += '<option value="10:00">10:00</option>';
global_business_hours += '<option value="10:30">10:30</option>';
global_business_hours += '<option value="11:00">11:00</option>';
global_business_hours += '<option value="11:30">11:30</option>';
global_business_hours += '<option value="12:00">12:00</option>';
global_business_hours += '<option value="12:30">12:30</option>';
global_business_hours += '<option value="13:00">13:00</option>';
global_business_hours += '<option value="13:30">13:30</option>';
global_business_hours += '<option value="14:00">14:00</option>';
global_business_hours += '<option value="14:30">14:30</option>';
global_business_hours += '<option value="15:00">15:00</option>';
global_business_hours += '<option value="15:30">15:30</option>';
global_business_hours += '<option value="16:00">16:00</option>';
global_business_hours += '<option value="16:30">16:30</option>';
global_business_hours += '<option value="17:00">17:00</option>';
global_business_hours += '<option value="17:30">17:30</option>';
global_business_hours += '<option value="18:00">18:00</option>';
global_business_hours += '<option value="18:30">18:30</option>';
global_business_hours += '<option value="19:00">19:00</option>';
global_business_hours += '<option value="19:30">19:30</option>';
global_business_hours += '<option value="20:00">20:00</option>';
global_business_hours += '<option value="20:30">20:30</option>';
global_business_hours += '<option value="21:00">21:00</option>';
global_business_hours += '<option value="21:30">21:30</option>';
global_business_hours += '<option value="22:00">22:00</option>';
global_business_hours += '<option value="22:30">22:30</option>';
global_business_hours += '<option value="23:00">23:00</option>';
global_business_hours += '<option value="23:30">23:30</option>';
global_business_hours += '<option value="00:00">00:00</option>';
global_business_hours += '<option value="00:00">00:30</option>';


function showError(message) {
    $(".alert-danger").html("*" + message);
    $(".alert-danger").show();
    $("html, body").animate({scrollTop: 0});
    setTimeout(function() {
        $(".alert-danger").html("");
        $(".alert-danger").hide();
    }, settimeout);
}

function showSuccess(message) {
    $(".alert-success").html(message);
    $(".alert-success").show();
    $("html, body").animate({scrollTop: 0});
    setTimeout(function() {
        $(".alert-success").html("");
        $(".alert-success").hide();
    }, settimeout);
}

function ifBlank(type, value) {
    if (value == '' || (/^\s*$/.test(value))) {
        showError(type + " can not be empty");
        return false;
    }
    else
        return true;
}


function ifMatch(type, value1, value2) {
    if (value1 != value2) {
        showError(type + " do not match");
        return false;
    }
    else
        return true;
}

function ifValidEmail(type, value) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!(testEmail.test(value))) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}

function ifNumeric(type, value) {

    if (isNaN(value) == true) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}


//getLatLongByAddress(street,city,state,country,zipcode);
function getLatLongByAddress(street, city, state, country, zipcode) {
    var address = street + ', ' + city + ', ' + state + ', ' + country + ', ' + zipcode;
    var latlong = $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=true",
        type: "POST",
        dataType: 'JSON',
        async: false,
        success: function(res) {
            console.log("from hit");
            console.log(res);
            return res;
            
//            latitude = res.results[0].geometry.location.lat;
//            longitude = res.results[0].geometry.location.lng;
        }
    });
    return latlong;
}  

function getAccessToken() { 
     console.log("in getaccesstoken")
    var refresh_token = $.cookie("refresh_token")
    var params = {
        "grant_type": "refresh_token",
        "client_id": "iNeedTreezWebv1",
        "client_secret": "LCeerVeAGDcaHY8z4v4tXprPQv",
        "refresh_token": refresh_token
    }
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: globalpath + 'auth/oauth/token',
        contentType: "application/json",
         data: JSON.stringify(params),
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + $.cookie("access_token"));
                    },
        success: function(response) { 
    console.log("in success getaccesstoken")
            console.log(response);

            if (response["access_token"] != "") {
                $.cookie("access_token", response["access_token"]);
                $.cookie("refresh_token", response["refresh_token"]);
                console.log("Access_token:  " + response["access_token"]);
              
               
               
            }
        },
        error: function(error) {
           
        }

    });

}
