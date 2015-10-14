module.exports = function(app) {

	// TODO: Define controllers ============================================
	
	// about page
	app.get('/about', function(req, res) {
		res.render('about', {
			'bg':'omne.jpg',
			'heading':'O mne',
			'subheading':'Jsem programátor ale hlavně člověk jako každý jiný'
		})
	})

	// home page
	app.get('/', function(req, res) {
		// Get all posts
		var context = null;
		var Post = require('./models/post.js')
		Post.find({ removed: false }, function(err, posts) {
			if(err) {
				console.log(err)
				res.render('home', {
					'bg':'frida.jpg',
					'heading':'Web o webu', 
					'subheading':'Web o programování webových aplikací a světa kolem nich (v češtině)'
				})
			}
			else
				// map posts from database
				var context = {
					posts: posts.map(function(post) {
						return {
							name: post.name,
							nameUrl: post.nameUrl,
							subheading: post.subheading,
							datetime: post.datetimeFriendly,
							userId: post.userId
						}
					})
				}

				// render home page with list of posts
				res.render('home', {
					'bg':'frida.jpg',
					'heading':'Web o webu', 
					'subheading':'Web o programování webových aplikací a světa kolem nich (v češtině)',
					'posts': context.posts
				})
		})
	})

	// contact page
	app.get('/contact', function(req, res) {
		res.render('contact', {
			'bg':'contact.jpg',
			'heading':'Kontaktujte mne',
			'subheading':'Máte dotaz nebo hledáte pomoc s tvorbou webové aplikace?'
		})
	})

	// mail controller
	app.use(require('./controllers/mail'))

	// posts controller
	app.use('/post', require('./controllers/post'))

	// error controllers
	app.use(require('./controllers/error'))

}