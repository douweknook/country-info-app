// SOLUTION FOR PART TWO

// var fs = require('fs')
var reader = require(__dirname+'/modules/json-file-reader')

// Use readline to get input from command line
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// function askFeedback(similar) {
// 	rl.on('line', function(input) {
// 		if (input == 'Y') {
// 			console.log('YES!')
// 			reader.filter()
// 			rl.close()
// 		} else if (input == 'N') {
// 			console.log('NO!')
// 			rl.close()
// 		} else {
// 			console.log("Required input: [Y/N]")
// 		}
// 	})
// }

console.log("Let me search for info on "+process.argv[2]+"...")
reader.filereader(__dirname+'/countries.json', reader.filter)
// askFeedback()











// function findData(countries, country) {
// 	var foundResult = false
// 	// Make sure first letter is uppercase
// 	var countryName = country[0].toUpperCase()+country.substring(1)
// 	// Go over all country objects from json file
// 	for (var i = 0; i < countries.length; i++) {
// 		if (countries[i].name == countryName) {
// 			foundResult = true
// 			// Country: <name>
// 			console.log("Country: "+countries[i].name)
// 			// Top Level Domain: <topLevelDomain>
// 			console.log("Top Level Domain: "+countries[i].topLevelDomain)
// 		}
// 	}
// 	if (foundResult == false) {
// 		console.log(findSimilar(countries))
		
// 	}
// }

// function findSimilar(countries) {
// 	var simScores = []
// 	for (var i = 0; i < countries.length; i++) {
// 		var sim = string_sim.compareTwoStrings(process.argv[2], countries[i].name)
// 		simScores.push({country: countries[i].name, score: sim})
// 	}
// 	var sortedScores = simScores.sort(function(a,b) {
// 		return b.score - a.score
// 	})
// 	result = "Could not find anything for "+process.argv[2]
// 	return (sortedScores[0].score == 0) ? result+="\nPlease enter a country name" 
// 										: result +="\nDid you mean "+sortedScores[0].country+"? [Y/N]"
// }