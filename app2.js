// SOLUTION FOR PART TWO

var fs = require('fs')
var reader = require(__dirname+'/modules/json-file-reader')

function findData(countries) {
	foundResult = false
	// Make sure first letter is uppercase
	countryName = process.argv[2][0].toUpperCase()+process.argv[2].substring(1)
	// Go over all country objects from json file
	for (var i = 0; i < countries.length; i++) {
		if (countries[i].name == countryName) {
			foundResult = true
			// Country: <name>
			console.log("Country: "+countries[i].name)
			// Top Level Domain: <topLevelDomain>
			console.log("Top Level Domain: "+countries[i].topLevelDomain)
		}
	}
	if (foundResult == false) console.log("Could not find anything")
}

console.log("Let me search for info on "+process.argv[2]+"...")

reader(__dirname+'/countries.json', findData)
