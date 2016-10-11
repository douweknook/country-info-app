// THIS CODE DOES NOT WORK. READFILE FUNCTIONS OVERWRITES THE WHOLE this. THING.

var fs = require('fs')

var Reader = function(source){
	this.country = process.argv[2],
	this.result = {},
	this.read = function(callback){
		console.log('reading file')
		fs.readFile(source, 'utf-8', function(err, data) {
			if (err) throw err
			// Parse data into JS object 
			this.json = JSON.parse(data)
			// Go over data to find required country info
			callback()
		})
	},
	this.filter = function(){
		console.log('filtering file')
		for (var i = 0; i < this.json.length; i++) {
				if (this.json[i].name == process.argv[2]) {
					// Country: <name>
					this.result.country = this.json[i].name
					console.log(this.json[i].name)
					// Top Level Domain: <topLevelDomain>
					this.result.tld = this.json[i].topLevelDomain
					console.log(this.json[i].topLevelDomain)
				}
			}
	}
	this.print = function(){
		console.log(this.result.country)
		console.log(this.result.tld)
	}
}

var result = new Reader(__dirname+'/countries.json')
result.read( result.filter )
