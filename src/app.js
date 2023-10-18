const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('./helpers/passport');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3350;

const urls = require('./routes/routes');
const auth = require('./routes/auth');

require('dotenv').config();
require('./db/conn_db');

app.use(session({
    secret: 'Token-Auth',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', urls);
app.use('/api-auth', auth);


app.use(passport.initialize());
app.use(passport.session());

app.listen(port)
    console.log('API listening in the port: ' + port);

module.exports = {
    app
}