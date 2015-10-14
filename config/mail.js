var nodemailer = require('nodemailer')
var credentials = require('./credentials')

var mailTransport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: credentials.gmail.login,
		pass: credentials.gmail.pass
	},
	debug: true
})

mailTransport.on('log', console.log)

module.exports = mailTransport