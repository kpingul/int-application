'use strict';
var express = require('express');
var authService = require('../../services/auth');
var userService = require('../../services/user');
var oauth2Service = require('../../services/oauth2');
var passport = require('passport');
module.exports = (function() {
	var auth = express.Router();

	auth.post('/oauth/token', oauth2Service.token);

	auth.put('/verify', userService.verifyVerificationToken);

	auth.post('/passwordReset', userService.sendPasswordResetToken);

	auth.post('/verify', userService.sendVerificationToken);

	//TODO: do we need a service side logout to expire the token?
	//auth.post('/logout', authService.logout);
	auth.get('/twitter', passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
	auth.use('/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/'
	}));

	auth.get('/facebook', passport.authenticate('facebook'));

	// handle the callback after twitter has authenticated the user
	auth.use('/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/',
	}));
	return auth;
})();

