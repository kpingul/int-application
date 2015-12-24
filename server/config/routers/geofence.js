'use strict';
var express = require('express');
var passport = require('passport');
var geoService = require('../../services/geofence');

module.exports = (function () {
    var geo = express.Router();

    geo.get('/',
        geoService.locate);

    geo.get('/capture',
        passport.authenticate('bearer', {
            session: false
        }),
        geoService.capture);

    return geo;
})();