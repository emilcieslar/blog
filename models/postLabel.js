var mongoose = require('mongoose')

var postLabelSchema = mongoose.Schema({
	postId: String,
	labelId: String
})

module.exports = mongoose.model('PostLabel', postLabelSchema)