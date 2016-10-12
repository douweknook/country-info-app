var fs = require('fs')
var string_sim = require('string-similarity') // uses Dice coefficient to calculate string similarity

// Global variables
var parsedData = {}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var filereader = function(filename, callback) {
	fs.readFile(filename, 'utf-8', function(err, data) {
		if (err) throw err
		parsedData = JSON.parse(data)
		callback(process.argv[2], askFeedback)
	})
}
exports.filereader = filereader

var filter = function(country, callback) {
	var foundResult = false
	// Make sure first letter is uppercase
	var countryName = country[0].toUpperCase()+country.substring(1)
	// Go over all country objects from json file
	for (var i = 0; i < parsedData.length; i++) {
		if (parsedData[i].name == countryName) {
			foundResult = true
			// Country: <name>
			console.log("Country: "+parsedData[i].name)
			// Top Level Domain: <topLevelDomain>
			console.log("Top Level Domain: "+parsedData[i].topLevelDomain)
		}
	}
	if (foundResult == false) {
		result = "Could not find anything for "+process.argv[2]
		mostSimilar = findSimilar()
		if (mostSimilar == false) {
			console.log(result+="\nPlease enter a country name")
		} else {
			console.log(result+="\nDid you mean "+mostSimilar+"? [Y/N]")
			callback(mostSimilar)
		}
		
	}
}
exports.filter = filter

function findSimilar() {
	var simScores = []
	for (var i = 0; i < parsedData.length; i++) {
		var sim = string_sim.compareTwoStrings(process.argv[2], parsedData[i].name)
		simScores.push({country: parsedData[i].name, score: sim})
	}
	var sortedScores = simScores.sort(function(a,b) {
		return b.score - a.score
	})
	if (sortedScores[0].score == 0) {
		return false
	} else {
		return sortedScores[0].country //result +=, sortedScores[0].country
	}
}

function askFeedback(similarCountry) {
	rl.on('line', function(input) {
		if (input == 'Y' || input == 'y') {
			filter(similarCountry, askFeedback)
			rl.close()
		} else if (input == 'N' || input == 'n') {
			rl.close()
		} else {
			console.log("Required input: [Y/N]")
		}
	})
}