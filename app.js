// SOLUTION FOR PART TWO

// Require functions from module
var reader = require(__dirname+'/modules/json-file-reader')

// Start app
console.log("Let me search for info on "+process.argv[2]+"...")
reader.filereader(__dirname+'/countries.json', reader.filter)