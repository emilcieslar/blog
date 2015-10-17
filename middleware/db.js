var methods = {

	// method to get all labels from database
	getLabels:  function (callback) {
					// get all labels
					var Label = require('../models/label.js')
					Label.find(function(err, stitky) {
						if(err)
							console.error('Nejsou labely')
						else
							callback(stitky)
					})
				}
}

module.exports = methods