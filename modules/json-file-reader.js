var fs = require('fs')

function filereader(filename, callback) {
	fs.readFile(filename, 'utf-8', function(err, data) {
		if (err) throw err
		var parsedData = JSON.parse(data)
		callback(parsedData, process.argv[2])
	})
}

module.exports = filereader