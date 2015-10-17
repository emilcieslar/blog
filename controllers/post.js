var router = require('express').Router()
var Post = require('../models/post.js')
var Label = require('../models/label.js')
var mongoose = require('mongoose')
// Auth middleware
var auth = require('../middleware/auth.js')
// Database methods
var dbFunc = require('../middleware/db.js')

// add post page
router.get('/add', auth.isLoggedIn, function(req, res) {
	res.render('add-post', {
		'post': true,
		'postedBy': true,
		'color': 252525,
		'heading': 'Přidat příspěvek'
	})
})

// add post form
router.post('/add', auth.isLoggedIn, function(req, res) {
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
router.get('/edit/:postname', auth.isLoggedIn, function(req, res) {
	// Find the post
	Post.findOne({'nameUrl':req.params.postname},function(err, post) {
		if(err) {
			console.log(err)
			res.redirect(303, '/post/add')
		}
		else
			dbFunc.getLabels(function(labels) {
				// render edit page
				res.render('edit-post', {
					'post': post,
					'postedBy': true,
					'color': 252525,
					'heading': 'Upravit příspěvek',
					'labels': labels
				})
			})
	})
})

// edit post form
router.post('/edit/:postname', auth.isLoggedIn, function(req, res) {

	// Create post variable with all the information
	var post = {
		name: req.body.postName,
		nameUrl: Post.sanitizeName(req.body.postName),
		subheading: req.body.postSubheading,
		labelIds: req.body.labels,
		body: req.body.postBody
	}

	// Update the post
	Post.update({ _id: req.body.id }, { $set: post }, { upsert: false }, function(err) {
		if(err)
			console.log(err)
		// First remove the postId from labels that are not in post.labelIds
		Label.update({_id: { $nin: post.labelIds }}, { $pull: {postIds:req.body.id} }, {multi: true}, function(err, affected) {
			//console.log(err)
			//console.log(affected)
			// Then add the postId to the labels that are in post.labelIds (if the postId is already there, it won't be added again)
			Label.update({_id: { $in: post.labelIds }}, {$addToSet: {postIds:req.body.id}}, {multi: true}, function(err, affected) {
				//console.log(err)
				//console.log(affected)
				// After all the operations, redirect to the post
				res.redirect(303, '/post/' + post.nameUrl)
			})
		})
	})
})

// remove post
router.get('/remove/:postname', auth.isLoggedIn, function(req, res) {
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
			dbFunc.getLabels(function(labels) {
				// render post page
				res.render('post', {
					'post': true,
					'heading': post.name,
					'subheading': post.subheading,
					'nameUrl': post.nameUrl,
					'userId': post.userId,
					'datetime': post.datetimeFriendly,
					'body': post.body,
					'labelIds': post.labelIds,
					'labels': labels,
					'color': 252525
				})
			})
	})
})

module.exports = router