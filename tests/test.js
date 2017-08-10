var test = require('tape')
var resync = require('../index')
var concat = require('concat-stream')
var fs = require('fs')

function compare (t, offset, expected) {
  t.plan(1)

  fs.createReadStream('tests/data')
    .pipe(resync(offset))
    .pipe(concat(function (result) {
      t.equals(result.toString(), expected)
    }))
}

test('+1000ms', function (t) {
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

  compare(t, 1000, expected)
})

test('-1000ms', function (t) {
  var expected = `1
00:00:02,638 --> 00:00:04,972
WOMBAT: <i> Previously on</i>
NPM...

2
00:00:04,974 --> 00:00:09,376
ENSIGN: There's too many modules
Captain; she's gonna--

3
00:00:10,646 --> 00:00:11,712
(EXPLOSION)`

  compare(t, -1000, expected)
})

test('+00:01:01,000', function (t) {
  var expected = `1
00:01:04,638 --> 00:01:06,972
WOMBAT: <i> Previously on</i>
NPM...

2
00:01:06,974 --> 00:01:11,376
ENSIGN: There's too many modules
Captain; she's gonna--

3
00:01:12,646 --> 00:01:13,712
(EXPLOSION)`

  compare(t, '00:01:01,000', expected)
})

test('-00:00:02,000', function (t) {
  var expected = `1
00:00:01,638 --> 00:00:03,972
WOMBAT: <i> Previously on</i>
NPM...

2
00:00:03,974 --> 00:00:08,376
ENSIGN: There's too many modules
Captain; she's gonna--

3
00:00:09,646 --> 00:00:10,712
(EXPLOSION)`

  compare(t, '-00:00:02,000', expected)
})
