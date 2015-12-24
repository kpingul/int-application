'use strict';
var passport = require('passport'),
    config = require('../../config/config'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    mongoose = require('mongoose'),
    AccessToken = mongoose.model('AccessToken'),
    User = mongoose.model('User');

var INVALID_CREDS = "Invalid username or password.";

module.exports = new BearerStrategy(function (accessToken, done) {
    AccessToken.findOne({
        token: accessToken
    }, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        if (Math.round((Date.now() - token.created) / 1000) > config.token_ttl) {
            AccessToken.remove({
                token: accessToken
            }, function (err) {
                if (err) return done(err);
            });
            return done(null, false, {
                message: 'Token expired'
            });
        }

        User.findById(token.userId, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: INVALID_CREDS
                });
            }

            var info = {
                scope: '*'
            }
            done(null, user, info);
        });
    });
});
