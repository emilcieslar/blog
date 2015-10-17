module.exports = function(hbs) {
	return hbs.create({
		defaultLayout: 'main',
		helpers: {
			json: function(context) {
				return JSON.stringify(context)
			},
			generateSelect: function(labels, postLabelIds) {
				var selectBox = '';
				labels.forEach(function(label) {
					var selected = (postLabelIds && postLabelIds.indexOf(label._id) > -1) ? " selected" : ""
					selectBox += '<option value="' + label._id + '"' + selected + '>' + label.name + '</option>'
				})
				return selectBox
			},
			generateLabels: function(labels, postLabelIds) {
				var labelList = []
				if(labels)
					labels.forEach(function(label) {
						if(postLabelIds && postLabelIds.indexOf(label._id) > -1)
							labelList.push(label.name)
					})
				return labelList
			}
		}
	})
}