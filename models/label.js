var mongoose = require('mongoose')

var labelSchema = mongoose.Schema({
	name: String,
	desc: String,
	postIds: [mongoose.Schema.ObjectId],
	removed: { type: Boolean, default: false }
})

module.exports = mongoose.model('Label', labelSchema)