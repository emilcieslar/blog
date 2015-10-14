var router = require('express').Router()
var Post = require('../models/post.js')

// add post page
router.get('/add', function(req, res) {
	res.render('add-post', {
		'post': true,
		'postedBy': true,
		'color': 252525,
		'heading': 'Přidat příspěvek'
	})
})

// add post form
router.post('/add', function(req, res) {
	new Post({
		name: req.body.postName,
		nameUrl: Post.sanitizeName(req.body.postName),
		subheading: req.body.postSubheading,
		body: req.body.postBody
	}).save(function(err, post) {
		if(err)
			console.log(err)
		res.redirect(303, '/post/' + post.nameUrl)
	})
})

// edit post page
router.get('/edit/:postname', function(req, res) {
	Post.findOne({'nameUrl':req.params.postname},function(err, post) {
		if(err) {
			console.log(err)
			res.redirect(303, '/post/add')
		}
		else
			// render edit page
			res.render('edit-post', {
				'post': post,
				'postedBy': true,
				'color': 252525,
				'heading': 'Upravit příspěvek'
			})
	})
})

// edit post form
router.post('/edit/:postname', function(req, res) {
	var post = {
		name: req.body.postName,
		nameUrl: Post.sanitizeName(req.body.postName),
		subheading: req.body.postSubheading,
		body: req.body.postBody
	}

	Post.update({ _id: req.body.id }, { $set: post }, { upsert: false }, function(err) {
		if(err)
			console.log(err)
		res.redirect(303, '/post/' + post.nameUrl)
	})
})

// remove post
router.get('/remove/:postname', function(req, res) {
	Post.update({ nameUrl: req.params.postname }, { $set: { removed: true } }, { upsert: false }, function(err) {
		if(err)
			console.log(err)
		res.redirect(303, '/')
	})
})

// post page
router.get('/:postname', function(req, res) {
	Post.findOne({ nameUrl: req.params.postname }, function(err, post) {
		if(err) {
			console.log(err)
			res.redirect(303, '/')
		} else
			// render post page
			res.render('post', {
				'post': true,
				'heading': post.name,
				'subheading': post.subheading,
				'nameUrl': post.nameUrl,
				'userId': post.userId,
				'datetime': post.datetimeFriendly,
				'body': post.body,
				'color': 252525
			})
	})
})

module.exports = router