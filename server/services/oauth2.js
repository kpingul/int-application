'use strict';
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var mongoose = require('mongoose');
var config = require('../config/config');

var User = mongoose.model('User');
var Client = mongoose.model('Client');
var AccessToken = mongoose.model('AccessToken');
var RefreshToken = mongoose.model('RefreshToken');

var publicFields = 'username fName lName created verified _id address';

// create OAuth 2.0 server
var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        user.authenticate(password).then(function (success) {
            if (!success) {
                return done(null, false);
            } else {
                RefreshToken.remove({
                    userId: user.userId,
                    clientId: client.clientId
                }, function (err) {
                    if (err) return done(err);
                });

                AccessToken.remove({
                    userId: user.userId,
                    clientId: client.clientId
                }, function (err) {
                    if (err) return done(err);
                });

                var tokenValue = crypto.randomBytes(64).toString('base64');
                var refreshTokenValue = crypto.randomBytes(64).toString('base64');
                var token = new AccessToken({
                    token: tokenValue,
                    clientId: client.clientId,
                    userId: user.userId
                });
                var refreshToken = new RefreshToken({
                    token: refreshTokenValue,
                    clientId: client.clientId,
                    userId: user.userId
                });
                refreshToken.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                });
                token.save(function (err, token) {
                    if (err) {
                        return done(err);
                    }
                    //strip private fields
                    user.password = undefined;
                    user.salt = undefined;
                    user.email = undefined;

                    done(null, tokenValue, refreshTokenValue, {
                        'expires_in': config.token_ttl,
                        user: user
                    });
                });
            }
        });
    });
}));

//TODO:use promises
// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    RefreshToken.findOne({
        token: refreshToken,
        clientId: client.clientId
    }, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            //remove any old tokens
            RefreshToken.remove({
                userId: user.userId,
                clientId: client.clientId
            }, function (err) {
                if (err) return done(err);
            });
            AccessToken.remove({
                userId: user.userId,
                clientId: client.clientId
            }, function (err) {
                if (err) return done(err);
            });


            //save new tokens
            var tokenValue = crypto.randomBytes(64).toString('base64');
            var refreshTokenValue = crypto.randomBytes(64).toString('base64');

            var token = new AccessToken({
                token: tokenValue,
                clientId: client.clientId,
                userId: user.userId
            });
            var refreshToken = new RefreshToken({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId
            });

            refreshToken.save(function (err) {
                if (err) {
                    return done(err);
                }
            });
            token.save(function (err, token) {
                if (err) {
                    return done(err);
                }
                done(null, tokenValue, refreshTokenValue, {
                    'expires_in': config.token_ttl
                });
            });
        });
    });
}));

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {
        session: false
    }),
    server.token(),
    server.errorHandler()
]
