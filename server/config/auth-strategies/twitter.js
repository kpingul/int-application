var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    mongoose = require('mongoose'),
    config = require('../config'),

    User = mongoose.model('User');

module.exports = new TwitterStrategy({
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: config.twitter.callback
    },
    function(token, tokenSecret, profile, done) {
        // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({
                'twitter.id': profile.id
            }, function(err, user) {
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.tw = {
                        id: profile.id,
                        token: token,
                        username: profile.username,
                        displayName: profile.displayName
                    };

                    newUser.username = profile.username;

                    console.log(profile);
                    // save our user into the database
                    //                    newUser.save(function (err) {
                    //                        if (err)
                    //                            throw err;
                    //                        return done(null, newUser);
                    //                    });
                }
            });

        });
    }
);