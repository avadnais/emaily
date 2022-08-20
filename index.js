const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app); // ./routes/authRoutes returns a function then invokes immediately with (app)

const PORT = process.env.PORT || 5000;
app.listen(PORT);
