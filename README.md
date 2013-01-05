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
var test = new Rainbow({ r: 255, g: 255, b: 255 });
console.log( test.hsv );
> { h: 0, s: 0, v: 100 }
```

HSV to RGB:
```javascript
var test = new Rainbow({ h: 0, s: 0, v: 100 });
console.log( test.hsv );
> { r: 255, g: 255, b: 255 }
```

RGB to hex:
```javascript
var test = new Rainbow({ r: 255, g: 255, b: 255 });
console.log( test.hex );
> 'ffffff'
```

hex to RGB:
```javascript
var test = new Rainbow('ffffff');
console.log( test.rgb );
> { r: 255, g: 255, b: 255 }
```

RGB to CMYK:
```javascript
var test = new Rainbow({ r: 255, g: 255, b: 255 });
console.log( test.cmyk );
> { c: 0, m: 0, y: 0, k: 0 }
```

CMYK to RGB:
```javascript
var test = new Rainbow({ c: 0, m: 0, y: 0, k: 0 });
console.log( test.rgb );
> { r: 255, g: 255, b: 255 }
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