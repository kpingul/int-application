define([
    'jquery',
    'underscore',
    'cookie',
    'config',
    'backbone'
], function($, _, cookie, config, Backbone) {
    var Details = Backbone.Collection.extend({
        url: globalpath + $.cookie("search_string"),
        parse: function(response) {
//            if (response["flag"] == 9)
//            {
//                $.cookie('accesstoken', "");
//                window.location.href = "#login";
//                return false;
//            }
            console.log("Data from collectionssss");
            console.log(response);
            console.log("Data from collectionssss");

            
            return response;
        }
    });
    return Details;
});