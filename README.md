# resync-srt

> Streaming* command and module that reads SRT data and a time offset and
> outputs the resultant SRT.

## example

To use `resync-srt` as a command, install it using npm:

```
$ npm install -g resync-srt
```

You can feed it either files or raw data from stdin:

```
$ resync-srt 500
1
00:00:00,000 --> 00:03:00,000
Hello, warld!
^D
```

which will output

```
1
00:00:00,500 --> 00:03:00,500
Hello, warld!
```

If this data was in an `.srt` file you could also use the filename as the first
argument:

```
$ resync-srt foo.srt -1000
```

## usage

```
resync-srt [FILE] MILLISECOND-OFFSET
```

## api

```
var resync = require('resync-srt')
```

### `resync(offsetMs)`

`resync-srt` exports a single method, which accepts an offset in millseconds.
Positive values push the timestamps forward in time, while negative values push
them backward.

This returns a
[Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform)
stream: reading SRT data and outputting SRT data that has been time-shifted.

## streaming*

This is still using [subtitle.js](https://github.com/gsantiago/subtitle.js)
which doesn't offer a streaming interface. This module merely wraps its
functionality into a convenient interface. See [the
issue](https://github.com/noffle/resync-srt/issues/1).

## license

MIT

