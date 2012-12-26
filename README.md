# Rainbow.js

![Rainbow](http://www.smartwebby.com/images/tutorials/fireworks/Rainbow/pic_rainbow5.jpg)

## Installation

[![Build Status](https://travis-ci.org/jiin/Rainbow.png?branch=master)](https://travis-ci.org/jiin/Rainbow)

Install this version via git:
```bash
npm install git://github.com/jiin/Rainbow.git
```

And use in your node source:
```javascript
var Rainbow = require('rainbow');
```

## Methods

Supported colors schemas are:

* __RGB__ ( Red Green Blue )
* __hex RGB__
* __HSV__ ( Hue Saturation Brightness )
* __CMYK__ ( Cyan Magenta Yellow Key black )

Examples of use:

RGB to HSV:
```javascript
Rainbow.rgb({ R: 255, G: 0, B: 255 }).toHSV()
// return { H: 300, S: 100, V: 100 }
```

HSV to RGB:
```javascript
Rainbow.hsv({ H: 300, S: 100, V: 100 }).toRGB()
// return { R: 0, G: 255, B: 127 }
```

RGB to hex:
```javascript
Rainbow.rgb({ R: 255, G: 255, B: 255 }).toHex()
// return 'ffffff'
```

hex to RGB:
```javascript
Rainbow.hex('ffffff').toRGB()
// return { R: 255, G: 255, B: 255 }
```

RGB to CMYK:
```javascript
Rainbow.rgb({ R: 255, G: 0, B: 255 }).toCMYK()
// return { C: 0, M: 1, Y: 0, K: 0 }
```

CMYK to RGB:
```javascript
Rainbow.cmyk({ C: 0, M: 1, Y: 0, K: 0 }).toRGB()
// return { R: 255, G: 0, B: 255 }
```

## License

Rainbow is released under the [GNU General Public License (GPL3)](https://www.gnu.org/licenses/gpl-3.0.html):
Copyright (C) 2012 jiin

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

On Debian systems, the complete text of the GNU General Public License
can be found in /usr/share/common-licenses/GPL-3.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.