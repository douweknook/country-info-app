var fs = require('fs')

function readJsonFile(filename, callback) {
	fs.readFile(filename, 'utf-8', function(err, data) {
		if (err) throw err
		var parsedData = JSON.parse(data)
		callback(parsedData)
	})
}

module.exports = readJsonFile