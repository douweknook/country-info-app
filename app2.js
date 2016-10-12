// SOLUTION FOR PART TWO

var fs = require('fs')
var string_sim = require('string-similarity') // uses Dice coefficient to calculate string similarity
var reader = require(__dirname+'/modules/json-file-reader')

process.stdin.setEncoding('utf8');

function findData(countries, country) {
	var foundResult = false
	// Make sure first letter is uppercase
	var countryName = country[0].toUpperCase()+country.substring(1)
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
	if (foundResult == false) {
		console.log(findSimilar(countries))
		
	}
}

function findSimilar(countries) {
	var simScores = []
	for (var i = 0; i < countries.length; i++) {
		var sim = string_sim.compareTwoStrings(process.argv[2], countries[i].name)
		simScores.push({country: countries[i].name, score: sim})
	}
	var sortedScores = simScores.sort(function(a,b) {
		return b.score - a.score
	})
	result = "Could not find anything for "+process.argv[2]
	return (sortedScores[0].score == 0) ? result+="\nPlease enter a country name" 
										: result +="\nDid you mean "+sortedScores[0].country+"? [Y/N]"
}

function askFeedback() {
	process.stdin.once('data', function(data) {
		data = data.trim()
	 	if (data == "Y" || data == "y") {
	 		//findData(countries, "Netherlands")
	 	} else if (data == "N" || data == "n") {
	 		console.log("NO!")
	 		process.stdin.on('close')
	 	} else {
	 		console.log(data)
	 		console.log("Enter Y or N!")
	 	}
	 })
}

console.log("Let me search for info on "+process.argv[2]+"...")

reader(__dirname+'/countries.json', findData)
askFeedback()