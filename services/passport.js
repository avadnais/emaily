const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		// once auth is complete, do this
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			} 

			const user = await new User({googleId: profile.id}).save();
			done(null, user);
			
		}
	)
);
