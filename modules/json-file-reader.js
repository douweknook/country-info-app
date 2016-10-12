var fs = require('fs')
var string_sim = require('string-similarity') // uses Dice coefficient to calculate string similarity

// Global variables
var parsedData = {}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Function to read and parse JSON files
var filereader = function(filename, callback) { // callback = filter
	fs.readFile(filename, 'utf-8', function(err, data) {
		if (err) throw err
		try {
			parsedData = JSON.parse(data)
			callback(process.argv[2], askFeedback)
		} catch (err) { // give error message if file is not json
			console.log("Given file is not JSON!")
			rl.close()
		}
	})
}
exports.filereader = filereader

// Function to filter specific country data
var filter = function(country, callback) { // callback = askFeedback
	var foundResult = false
	// Make sure first letter is uppercase
	var countryName = country[0].toUpperCase()+country.substring(1)
	// Go over all country objects from json file
	for (var i = 0; i < parsedData.length; i++) {
		if (parsedData[i].name == countryName) {
			foundResult = true
			// Log country name and tld
			console.log("Country: "+parsedData[i].name)
			console.log("Top Level Domain: "+parsedData[i].topLevelDomain)
			rl.close()
		}
	}
	// Check if any result was found
	if (foundResult == false) {
		result = "Could not find anything for "+process.argv[2]
		// Search for most similar result (Netherland -> Netherlands)
		mostSimilar = findSimilar()
		if (mostSimilar == false) {
			console.log(result+="\nPlease enter a country name")
		} else {
			console.log(result+="\nDid you mean "+mostSimilar+"? [Y/N]")
			// Call for feedback (askFeedback) if a similar country was found
			callback(mostSimilar)
		}
		
	}
}
exports.filter = filter

// Function to find the most similar country name based on Dice coefficient
function findSimilar() {
	var simScores = []
	// Get similarity score for each country name compared to given country
	for (var i = 0; i < parsedData.length; i++) {
		var sim = string_sim.compareTwoStrings(process.argv[2], parsedData[i].name)
		simScores.push({country: parsedData[i].name, score: sim})
	}
	// Sort countries by similarity score
	var sortedScores = simScores.sort(function(a,b) {
		return b.score - a.score
	})
	// Check if the highest score is (not) zero
	if (sortedScores[0].score == 0) {
		return false
	} else {
		// Return the closest country
		return sortedScores[0].country //result +=, sortedScores[0].country
	}
}

// Promopt user for feedback on suggested (highest sim) country
function askFeedback(similarCountry) {
	rl.on('line', function(input) {
		if (input == 'Y' || input == 'y') {
			// Call filter again with correct country name
			filter(similarCountry, askFeedback)
			rl.close()
		} else if (input == 'N' || input == 'n') {
			console.log("To bad. Please try again with a different country")
			rl.close()
		} else {
			console.log("Required input: [Y/N]")
		}
	})
}