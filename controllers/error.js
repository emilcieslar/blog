var router = require('express').Router()

// custom 404 page
router.use(function(req, res) {
	res.type('text/plain')
	res.status(404)
	res.send('404 - Not Found')
});
// custom 500 page
router.use(function(err, req, res, next) {
	console.error(err.stack)
	res.type('text/plain')
	res.status(500)
	res.send('500 - Server Error')
})

module.exports = router