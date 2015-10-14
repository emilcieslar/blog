var mongoose = require('mongoose')
var credentials = require('./credentials')

mongoose.connect(credentials.db, function(err) {
	if(err)
		console.log("error: " + err)
	else
		console.log('mongodb connected')
})

module.exports = mongoose