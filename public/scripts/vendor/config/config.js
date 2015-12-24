define([
    'jquery'
], function($) {
});

globalpath = "http://ineedtreez-dev.azurewebsites.net/api/";
settimeout = 3000;
global_category = '';
sub_category1 = '';
sub_category2 = '';
sub_category3 = '';
sub_category4 = '';

//global_category += '<option value="">Choose One</option>';
//global_category += '<option mydata="1" value="Treez">Treez</option>';
//global_category += '<option mydata="2" value="Tools">Tools</option>';
//global_category += '<option mydata="3" value="Products">Products</option>';
//global_category += '<option mydata="4" value="Legal">Legal</option>';

sub_category1 += '<option value="">Choose One</option>';
sub_category1 += '<option value="Delivery">Delivery</option>';
sub_category1 += '<option value="Dispensary">Dispensary</option>';
sub_category1 += '<option value="Transport">Transport</option>';

sub_category2 += '<option value="">Choose One</option>';
sub_category2 += '<option value="Grow">Grow</option>';
sub_category2 += '<option value="Smoke/Vape">Smoke/Vape</option>';

sub_category3 += '<option value="">Choose One</option>';
sub_category3 += '<option value="Edible">Edible</option>';
sub_category3 += '<option value="Wearable">Wearable</option>';
sub_category3 += '<option value="Personal Care">Personal Care</option>';

sub_category4 += '<option value="">Choose One</option>';
sub_category4 += '<option value="Doctors">Doctors</option>';
sub_category4 += '<option value="Attorneys">Attorneys</option>';
sub_category4 += '<option value="Security">Security</option>';



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


function getLatLongByAddress(zipcode) {
    var latlong = $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&sensor=true",
        type: "POST",
        dataType: 'JSON',
        async: false,
        success: function(res) {
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


//======== Getting browsers =======//
//var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
//// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
//var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
//var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
//// At least Safari 3+: "[object HTMLElementConstructor]"
//var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
//var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6

// Is this a version of IE? < 10
//if (isIE) {
//    if ($.browser.msie) {
//        var version = $.browser.version;
//        version = version.substring(0, version.indexOf('.'));
//        console.log("IEVersion: " + version);
//        if (version < 10) {
//            alert("We are sorry!  Your web browser software is out of date. Our application is optimized for Internet Explorer 10 & 11 as well as newer versions of Chrome, Firefox, and Safari.  If you are using an older version of any of these browsers, the sign up process will fail.  Please contact us at 1-800-461-9613 or at info@iggbo.com and we will be happy to help you.");
//        }
//    }
//}

//jQuery.support.cors = true

//console.log("Chrome: " + isChrome);
//console.log("Firefox: " + isFirefox);
//console.log("IE: " + isIE);

//function isScriptAlreadyIncluded(src){
//var loaded_scripts = document.getElementsByTagName("script");
//for (var i = 0; i < loaded_scripts.length; i++) {
//    console.log(i);
//    console.log("Scripts are");
//    console.log(loaded_scripts[i].getAttribute('src'));
//}
//}

//function isScriptAlreadyIncluded(src){
//    var scripts = document.getElementsByTagName("script");
//    for(var i = 0; i < scripts.length; i++) 
//       if(scripts[i].getAttribute('src') == src) return true;
//    return false;
//}


//======== Remove Set Time Out========//
//$(document).on('focusin', 'input, textarea', function() {
//    $(".alert.alert-danger").html("");
//    $(".alert.alert-danger").hide();
//});
////======== Placeholder for IE=======//
//function removePlaceholders()
//{
//    $('input[type="text"]').each(function() {
//        var input = $(this);
//        if (input.val() == input.attr('placeholder')) {
//            input.val('');
//        }
//    });
//}
//function setPlaceholdersAgain()
//{
//    $('input[type="text"]').focus(function() {
//        var input = $(this);
//        if (input.val() == input.attr('placeholder')) {
//            input.val('');
//            input.removeClass('placeholder');
//        }
//    }).blur(function() {
//        var input = $(this);
//        if (input.val() == '' || input.val() == input.attr('placeholder')) {
//            input.addClass('placeholder');
//            input.val(input.attr('placeholder'));
//        }
//    }).blur();
//}
//======== Form Validations=======//

//function isNumberKey(evt)
//{
//
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        var regex = /^[0-9]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && (charCode > 47 && charCode < 58))
//            return true;
//        return false;
//    }
//}

//function isNumberAndDecimalKey(evt)
//{
//
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        var regex = /^[0-9]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if ((charCode > 31 && (charCode > 47 && charCode < 58)) || charCode == 46)
//            return true;
//        return false;
//    }
//}
//function key_up(evt)
//{
//    var key_val = evt.key;
//    var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//    var value = String.fromCharCode(code);
//    if (key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//        return true;
//    return false;
//}


//function isAlphabet(evt)
//{
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        console.log(evt);
//        var regex = /^[a-zA-Z ]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32))
//            return true;
//        return false;
//    }
//}

//function isAlphabetandHyphen(evt)
//{
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        console.log(evt);
//        var regex = /^[a-zA-Z \-]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 45))
//            return true;
//        return false;
//    }
//}

//function isAlphabetHyphenCommaDot(evt)
//{
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        console.log(evt);
//        var regex = /^[a-zA-Z ,.\-]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || (charCode >= 44 && charCode <= 46)))
//            return true;
//        return false;
//    }
//}


//function preventSpecialChar(evt)
//{
//
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        var regex = /^[a-zA-Z0-9 ,.\-/]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && ((charCode > 43 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32))
//            return true;
//        return false;
//    }
//
//}

//function alphaNumeric(evt)
//{
//
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        var regex = /^[a-zA-Z0-9 ]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        if (charCode > 31 && ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32))
//            return true;
//        return false;
//    }
//
//}

//function isAlphabetNumberHyphenDot(evt)
//{
//
//    if (isFirefox)
//    {
//        var key_val = evt.key;
//        var regex = /^[a-zA-Z0-9 ]*$/;
//        var code = (evt.charCode) ? evt.charCode : evt.keyCode;
//        var value = String.fromCharCode(code);
//        if (regex.test(value) || key_val == "Tab" || key_val == "Backspace" || key_val == "Left" || key_val == "Right" || key_val == "Up" || key_val == "Down" || key_val == "Del" || key_val == "Home" || key_val == "End")
//            return true;
//        return false;
//    }
//    else
//    {
//        var charCode = (evt.which) ? evt.which : evt.keyCode;
//        console.log(charCode)
//        if (charCode > 31 && ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 45 || charCode == 46))
//            return true;
//        return false;
//    }
//
//}

//======== Setting Background =======//

//function fix_header_width()
//{
//    var window_width = $(window).width();
//    if (window_width < 1226)
//    {
//        $(".container-header").css("width", "1150px");
//        $(".gs_topbar").css("height", "0px");
//    }
//    else
//    {
//        $(".container-header").css("width", "100%");
//        $(".gs_topbar").css("height", "50px");
//    }
//}

//function set_background()
//{
//    var window_width = $(window).width();
//    var window_height = $(window).height();
//    if (window_width < 1226)
//    {
//        $(".wrapper").css("background", "none");
//        $(".container").css({"background": "url(images/bg.png)", "background-repeat": "no-repeat"});
//    }
//    else
//    {
//        $(".container").css("background", "none");
//        $(".wrapper").css({"background": "url(images/bg.png)", "background-repeat": "no-repeat", "background-size": "100%" + window_height + "px"});
//    }
//    //==== Scroll top to 0 every page====//
//    window.scrollTo(0, 0);
//    //==== Hide Body Loader after Page Load ====//
////    $(window).load(function(){
////        $("#preloader").hide();
////    });
//}

//function setheight() {
//    var window_height = $(window).height();
//    var window_width = $(window).width();
//    if (window_width < 1025)
//    {
//        $(".wrapper").css({"background": "url(images/bg.png)", "background-repeat": "no-repeat", "background-size": "100% auto", "height": "inherit"});
//    }
//    else
//    {
//        $(".wrapper").css({"background": "url(images/bg.png)", "background-repeat": "no-repeat", "background-size": "100% " + window_height + "px", "height": window_height + "px"});
//    }
//}

//======== Removing leading and trailing spaces =======//

//function trim_space(str)
//{
//    var new_str = str.replace(/^\s+|\s+$/g, '');
//    return new_str;
//}


//$.browser = {};
//(function() {
//    $.browser.msie = false;
//    $.browser.version = 0;
//    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
//        $.browser.msie = true;
//        $.browser.version = RegExp.$1;
//    }
//})();

