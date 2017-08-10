#!/usr/bin/env node

var resync = require('../index')
var fs = require('fs')

function printUsage () {
  console.error('USAGE: resync-srt [file] (hh:mm:ss,mmm | millisecond-offset)')
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

// parse offset arg
var match = process.argv[msArgIdx].match(/^(\-?)(\d{2}):(\d{2}):(\d{2}),(\d{3})$/)

if (match) {
  var negative = !!match[1]
  var hours = parseInt(match[2], 10)
  var minutes = parseInt(match[3], 10)
  var seconds = parseInt(match[4], 10)
  var milliseconds = parseInt(match[5], 10)

  hours *= 3600000
  minutes *= 60000
  seconds *= 1000

  msOffset = hours + minutes + seconds + milliseconds
  msOffset *= (negative ? -1 : 1)
} else {
  var msOffset = parseInt(process.argv[msArgIdx], 10)
  if (isNaN(msOffset)) {
    console.error('Invalid offset value. Must be numeric or using the format hh:mm:ss,mmm.\n')
    printUsage()
    process.exit(1)
  }
}

stream.pipe(resync(msOffset)).pipe(process.stdout)
