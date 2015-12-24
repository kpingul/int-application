var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
mongoose = require('mongoose'),
config = require('../config'),

User = mongoose.model('User');

module.exports = new FacebookStrategy({
	clientID: config.facebook.clientId,
	clientSecret: config.facebook.secret,
	callbackURL: config.facebook.callback,
},
function(token, refreshToken, profile, done) {
	// User.findOne won't fire until we have all our data back from Twitter
	process.nextTick(function() {

		User.findOne({
			'fb.id': profile.id
		},
		function(err, user) {
			if (err) {
				console.log("error findOne");
				return done(err);
			}

			// if the user is found then log them in
			if (user) {
				return done(null, user); // user found, return that user
			} else {
				// if there is no user, create them
				var newUser = new User();
        newUser.fName = profile._json.first_name;
        newUser.lName = profile._json.last_name;
        newUser.email = profile._json.email;

				// set all of the user data that we need
				newUser.fb = {
					id: profile.id,
					token: token,
					email: profile._json.email,
					name: profile.displayName
				};

				newUser.username = profile.id;
				newUser.save(function(err) {
					if (err){ 
            console.log(err);
            throw err;
          }
					return done(null, newUser);
				});
			}
		});

	});
});

