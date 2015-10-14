// set up ==================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var mongoose = require('mongoose')
var handlebars = require('express-handlebars')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

// configuration ===========================================================
var credentials = require('./config/credentials.js')
var mongoose = require('./config/database.js') // connect to database

// set up our express application
app.use(cookieParser())
app.use(bodyParser())
app.use(session({ secret: credentials.sessionSecret }))

// set up static directory
app.use(express.static('public'))

// set up view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// routes ==================================================================
require('./routes.js')(app)

app.listen(port, function(err) {
	if(err)
		console.log(err)
	else
		console.log('Express started on http://localhost:3000')
})

