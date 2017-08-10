var SrtParser = require('subtitle')
var through = require('through2')

module.exports = function (offset) {
  var match = String(offset).match(/^(\-?)(\d{2}):(\d{2}):(\d{2}),(\d{3})$/)

  if (match) {
    let negative = !!match[1]
    let hours = parseInt(match[2], 10)
    let minutes = parseInt(match[3], 10)
    let seconds = parseInt(match[4], 10)
    let milliseconds = parseInt(match[5], 10)

    hours *= 3600000
    minutes *= 60000
    seconds *= 1000

    offset = hours + minutes + seconds + milliseconds
    offset *= (negative ? -1 : 1)
  } else {
    offset = parseInt(offset, 10)
  }

  var data = []

  function read (chunk, enc, cb) {
    data.push(chunk)
    // data += chunk.toString()
    cb()
  }

  function flush (cb) {
    data = Buffer.concat(data).toString()

    var sub = new SrtParser()
    sub.parse(data)
    sub.resync(offset)
    this.push(sub.stringify().trim())
    cb()
  }

  return through(read, flush)
}
