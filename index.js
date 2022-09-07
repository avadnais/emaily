const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // ./routes/authRoutes returns a function then invokes immediately with (app)
require('./routes/billingRoutes')(app);
//
if (process.env.NODE_ENV === 'production') {
	// express will serve production assets like main.js or main.css
	app.use(express.static('client/build'));

	// express will serve the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
