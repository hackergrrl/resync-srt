var test = require('tape')
var resync = require('../index')
var concat = require('concat-stream')
var fs = require('fs')

test('basic', function (t) {
  var expected = `1
00:00:04,638 --> 00:00:06,972
WOMBAT: <i> Previously on</i>
NPM...

2
00:00:06,974 --> 00:00:11,376
ENSIGN: There's too many modules
Captain; she's gonna--

3
00:00:12,646 --> 00:00:13,712
(EXPLOSION)`

  t.plan(1)

  fs.createReadStream('tests/data')
    .pipe(resync(1000))
    .pipe(concat(function (result) {
      t.equals(result.toString(), expected)
    }))
})
