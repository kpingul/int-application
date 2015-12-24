
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    baseUrl: "scripts",
    // Mention locations of scripts we use
    paths: {
        backbone: 'vendor/backbone/backbone',
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/underscore/underscore',
        text: 'vendor/require/text',
        cookie: 'vendor/cookie/jquery.cookie',
        bootstrap: 'vendor/basejs/bootstrap',
        foundation_datepicker: 'vendor/basejs/foundation-datepicker',
        freewall: 'vendor/basejs/freewall',
        flexslider: 'vendor/basejs/jquery.flexslider',
        prettyphoto: 'vendor/basejs/jquery.prettyPhoto',
        emulator: 'vendor/basejs/jquery.trackpad-scroll-emulator',
        tubular: 'vendor/basejs/jquery.tubular.1.0',
        config: 'vendor/config/config',
        autocomplete: 'vendor/geocomplete/autocomplete',
        geocomplete: 'vendor/geocomplete/jquery.geocomplete',
        mapbox: 'vendor/mapbox/mapbox'

    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: ["Backbone"]
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'cookie': {
            deps: ['jquery'],
            exports: '$'
        },
        'config': {
            deps: ['jquery'],
            exports: 'config'
        },
        'tubular': {
            deps: ['jquery'],
            exports: 'tubular'
        },
        'geocomplete': {
            deps: ['jquery'],
            exports: 'geocomplete'
        },
        'flexslider': {
            deps: ['jquery'],
            exports: 'flexslider'
        },
        'prettyphoto': {
            deps: ['jquery'],
            exports: 'prettyphoto'
        } ,
         'mapbox': {
            deps: ['jquery'],
            exports: 'mapbox'
        }
    }
});

require(["jquery"], function() {
    require(["underscore", "backbone", "bootstrap", "cookie", "config", "tubular", "geocomplete", "flexslider", "prettyphoto","mapbox"], function() {
        require(['routers/router'], function(Router) {
            var router = new Router();
            Backbone.history.start();
        });
    });
});



 