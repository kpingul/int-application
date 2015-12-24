'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var searchService = require('../../services/search');
var oauth2Service = require('../../services/oauth2');
module.exports = (function() {
    var search = express.Router();

    search.get('/',
        searchService.validateCategories,
        searchService.validateLocation,
        searchService.validateGeneral,
        searchService.search);

    return search;
})();