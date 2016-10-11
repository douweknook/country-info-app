var fs = require('fs')

// Read and parse data from JSON file
var getData = function(filename, countryName) {
	// Read data file in as string
	fs.readFile(filename, 'utf-8', function(err, data) {
		if (err) {
			throw err
		}
		// Parse data into JS object 
		countriesData = JSON.parse(data)
		// Go over data to find required country info
		for (var i = 0; i < countriesData.length; i++) {
			if (countriesData[i].name == countryName) {
				// Country: <name>
				console.log("Country: "+countriesData[i].name)
				// Top Level Domain: <topLevelDomain>
				console.log("Top Level Domain: "+countriesData[i].topLevelDomain)
			}
		}
	})
}

getData("countries.json", process.argv[2])