var fs = require('fs')
var reader = require(__dirname+'/modules/json-file-reader')

function findData(data) {
	for (var i = 0; i < data.length; i++) {
		if (data[i].name == process.argv[2]) {
			// Country: <name>
			console.log("Country: "+data[i].name)
			// Top Level Domain: <topLevelDomain>
			console.log("Top Level Domain: "+data[i].topLevelDomain)
		}
	}
}

reader(__dirname+'/countries.json', findData)
console.log("Let me search for info on "+process.argv[2]+"...")