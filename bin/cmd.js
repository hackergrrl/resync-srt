var resync = require('../index')
var fs = require('fs')

function printUsage () {
  console.error('USAGE: resync-srt [file] millisecond-offset')
}

if (process.argv.length < 3 || process.argv.length > 4) {
  printUsage()
  process.exit(1)
}

var stream = process.stdin
var msArgIdx = 2

if (process.argv.length === 4) {
  stream = fs.createReadStream(process.argv[2])
  msArgIdx = 3
}

// parse milliseconds arg
var msOffset = parseInt(process.argv[msArgIdx], 10)
if (isNaN(msOffset)) {
  console.error('Invalid millisecond-offset value. Must be numeric.\n')
  printUsage()
  process.exit(1)
}

stream.pipe(resync(msOffset)).pipe(process.stdout)
