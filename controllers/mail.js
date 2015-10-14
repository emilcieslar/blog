var router = require('express').Router()
var mailTransport = require('../config/mail')
var validator = require('validator')

// add post form
router.post('/contact', function(req, res) {
	
	var name = validator.escape(req.body.name)
	var email = validator.escape(req.body.email)
	var number = validator.escape(req.body.number)
	var message = validator.escape(req.body.message)

	// Send the email
	mailTransport.sendMail({
		from: '"' + name + '" <' + email + '>',
		replyTo: '"' + name + '" <' + email + '>',
		to: 'emil.cieslar@gmail.com',
		subject: 'Zpráva z emmil.cz od ' + name,
		text: 'Zpráva od: ' + email + '\n\r' + 'Telefon: ' + number + '\n\r' + 'Zpráva:' + '\n\r' + message
	}, function(err, info) {
		if(err) 
			console.error('Unable to send email: ' + err)
		else
			console.log('Message send: ' + info.response)
	})

	// Redirect back to contact
	res.redirect(303, '/contact')
})

module.exports = router