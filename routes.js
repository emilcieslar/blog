module.exports = function(app, passport) {

	// TODO: Define controllers ============================================

	// Set up locals for authenticated user
	// in order we can use it inside the template as follows
	// {{#if user}}...{{/if}}
	app.use(function (req, res, next) {
		if(req.isAuthenticated()) {
			res.locals.user = req.user.local.email
		}

		next()
	})

	// =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login', {
        	message: req.flash('loginMessage'),
        	heading: 'Přihlásit se',
        	bg: 'omne.jpg'
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    /*app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', {
        	message: req.flash('signupMessage'),
        	heading: 'Vytvořte si účet',
        	bg: 'omne.jpg'
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

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
		Post.find({ removed: false }).sort('datetime').exec(function(err, posts) {
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

				// Get all labels
				var Label = require('./models/label.js')
				Label.find(function(err, labels) {
					if(err)
						console.log(err)
					else
						// render home page with list of posts
						res.render('home', {
							'bg':'frida.jpg',
							'heading':'Web o webu',
							'subheading':'Web o programování webových aplikací a světa kolem nich (v češtině)',
							'posts': context.posts,
							'labels': labels
						})
				})
		})
	})

	// contact page
	app.get('/contact', function(req, res) {
		res.render('contact', {
			'bg':'contact.jpg',
			'heading':'Kontaktujte mne',
			'subheading':'Máte dotaz nebo hledáte pomoc s tvorbou webové aplikace?',
			'message':req.flash('contactSuccess')
		})
	})

	// mail controller
	app.use(require('./controllers/mail'))

	// posts controller
	app.use('/post', require('./controllers/post'))

	// error controllers
	app.use(require('./controllers/error'))

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
