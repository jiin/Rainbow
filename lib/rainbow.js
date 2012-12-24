// rainbow.js

var Rainbow = function() {
  this._HSV  = { H: 0, S: 0, V: 0 };
  this._RGB  = { R: 0, G: 0, B: 0 };
  this._CMYK = { C: 0, M: 0, Y: 0, K: 0 };
};

Rainbow.prototype.hexToRGB = function( hex ) {
  hex = parseInt( hex, 16 );

  this._RGB.R = ( hex >> 16 ) & 0xFF;
  this._RGB.G = ( hex >> 8  ) & 0xFF;
  this._RGB.B = hex & 0xFF;

  return this._RGB;
};

Rainbow.prototype.RGBtoHex = function( RGB ) {
  return ([ RGB.R.toString(16), RGB.G.toString(16), RGB.B.toString(16)].join(''));
};

Rainbow.prototype.RGBtoCMYK = function( RGB ) {
  this._CMYK.K = Math.min( 1 - RGB.R, 1 - RGB.G, 1 - RGB.B );

  this._CMYK.C = ( 1 - RGB.R - this._CMYK.K ) / ( 1 - this._CMYK.K ) * 255;
  this._CMYK.M = ( 1 - RGB.G - this._CMYK.K ) / ( 1 - this._CMYK.K ) * 255;
  this._CMYK.Y = ( 1 - RGB.B - this._CMYK.K ) / ( 1 - this._CMYK.K ) * 255;

  return this._CMYK;
};

Rainbow.prototype.CMYKtoRGB = function( CMYK ) {
  var base = 255 - CMYK.K;

  this._RGB.R = Math.round( base * ( 255 - CMYK.C ) / ( 255 * 2 ));
  this._RGB.G = Math.round( base * ( 255 - CMYK.M ) / ( 255 * 2 ));
  this._RGB.B = Math.round( base * ( 255 - CMYK.Y ) / ( 255 * 2 ));

  return this._RGB;
};

Rainbow.prototype.RGBtoHSV = function( RGB ) {
  var min    = Math.min( Math.min( RGB.R, RGB.G ), RGB.B ),
      max    = Math.max( Math.max( RGB.R, RGB.G ), RGB.B ),
      chroma = max - min;

  if( chroma != 0 ) {
    if( RGB.R === max ) {
      this._HSV.H = ( RGB.G - RGB.B ) / chroma;
      if( this._HSV.H < 0 ) 
        this._HSV.H += 6;
    }
    else if( RGB.G === max )
      this._HSV.H = (( RGB.B - RGB.R ) / chroma ) + 2;
    else
      this._HSV.H = (( RGB.R - RGB.G ) / chroma ) + 4;

    this._HSV.H *= 60;
    this._HSV.S  = chroma / max;
  }

  this._HSV.V = max;
  return this._HSV;
};

Rainbow.prototype.HSVtoRGB = function( HSV ) {
  var chroma = HSV.S * HSV.V,
      dash   = HSV.H / 60,
      min    = HSV.V - chroma,
      x      = chroma * ( 1 - Math.abs(( dash % 2 ) - 1 ));

  if( dash < 1 ) {
    this._RGB.R = chroma; 
    this._RGB.G = x;
  } else if( dash < 2 ) {
    this._RGB.R = x; 
    this._RGB.G = chroma;
  } else if( dash < 3 ) {
    this._RGB.G = chroma; 
    this._RGB.B = x;
  } else if( dash < 4 ) {
    this._RGB.G = x; 
    this._RGB.B = chroma;
  } else if( dash < 5 ) {
    this._RGB.R = chroma; 
    this._RGB.B = x;
  } else if( dash < 6 ) {
    this._RGB.R = x; 
    this._RGB.B = chroma;
  }

  this._RGB.R += min;
  this._RGB.G += min;
  this._RGB.B += min;

  this._RGB.R *= 255;
  this._RGB.G *= 255;
  this._RGB.B *= 255;

  return this._RGB;
};

module.exports = Rainbow;