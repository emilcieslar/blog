// set up ==================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 8081
var mongoose = require('mongoose')
var handlebars = require('express-handlebars')
var flash = require('connect-flash');

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// configuration ===========================================================
var credentials = require('./config/credentials.js')
var mongoose = require('./config/database.js') // connect to database

// set up our express application
app.use(cookieParser())
app.use(bodyParser())
app.use(session({ secret: credentials.sessionSecret }))
app.use(flash()) // for flash messages stored in session
require('./config/passport')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// set up static directory
app.use(express.static('public'))

// set up view engine
var hbs = require('./config/handlebars.js')(handlebars)
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


// routes ==================================================================
require('./routes.js')(app, passport)

app.listen(port, function(err) {
	if(err)
		console.log(err)
	else
		console.log('Express started on http://localhost:3000')
})

