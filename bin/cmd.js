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
var offset = process.argv[msArgIdx]
var match = offset.match(/^(\-?)(\d{2}):(\d{2}):(\d{2}),(\d{3})$/)

if (!match) {
  if (isNaN(parseInt(offset, 10))) {
    console.error('Invalid offset value. Must be milliseconds (numeric) or hh:mm:ss,mmm.\n')
    printUsage()
    process.exit(1)
  }
}

stream.pipe(resync(offset)).pipe(process.stdout)
