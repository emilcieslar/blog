var mongoose = require('mongoose')
var moment = require('moment')
var removeDiacritics = require('diacritics').remove

var postSchema = mongoose.Schema({
	name: String,
	nameUrl: String,
	subheading: String,
	datetime: { type: Date, default: Date.now },
	userId: { type: String, default: 'Emil Cieslar' },
	body: String,
	labelIds: [mongoose.Schema.ObjectId],
	removed: { type: Boolean, default: false }
})

postSchema.virtual('datetimeFriendly').get(function() {
	var newFormat = new moment(this.datetime).locale("cs")
	return newFormat.format("LL")
})

postSchema.statics.sanitizeName = function sanitizeName(name) {
	return replaceAll(removeDiacritics(name.toLowerCase()), ' ','-')
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

module.exports = mongoose.model('Post', postSchema)