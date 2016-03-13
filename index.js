var SrtParser = require('subtitle')
var through = require('through2')

module.exports = function (msOffset) {
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
    sub.resync(msOffset)
    this.push(sub.stringify().trim())
    cb()
  }

  return through(read, flush)
}
