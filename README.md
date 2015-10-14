# NodeJS blog

./config/credentials.js must be created in order to make it work

module.exports = {
	'db': 'mongodb://localhost/dbname',
	'sessionSecret': 'sessionsecret',
	'gmail': {
		login: 'yourlogin',
		pass: 'yourpass'
	}
}
