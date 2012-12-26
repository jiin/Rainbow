// rainbow.js

var utile = require('utile');

var Rainbow = function() {
  this._version = 0.02;
};

Rainbow.prototype.reciprocal = function( n ) {
  return( 1 - n );
};

Rainbow.prototype.round = function( n, to ) {
  return( Math.round( n * Math.pow( 10, to ) ) / Math.pow( 10, to ) );
}

Rainbow.prototype.rgb = function( rgbSchema ) {
  var superClass = this;

  return {
    RGB : rgbSchema,
    HEX : '',
    CMYK: {},
    HSV : {},

    toHex: function() {
      var self = this;

      utile.each( this.RGB, function( value, key ) {
        self.HEX += value.toString(16);
      });

      return self.HEX;
    },

    toCMYK: function() {
      var self = this;

      var corrispondences = {
        'R': 'C',
        'G': 'M',
        'B': 'Y'
      };

      if( utile.filter( self.RGB, function( k ) { return( k == 0 ); }).length === 3 )
        return { C: 0, M: 0, Y: 0, K: 1 };

      utile.each( this.RGB, function( value, key ) {
        self.RGB[ key ] = superClass.reciprocal( value / 255 );
      });

      self.CMYK.K = Math.min( self.RGB.R, Math.min( self.RGB.G, self.RGB.B ));

      utile.each( this.RGB, function( value, key ) {
        self.CMYK[ corrispondences[key] ] = (( value - self.CMYK.K ) / superClass.reciprocal( self.CMYK.K ));
      });

      return self.CMYK;
    },

    toHSV: function() {
      var self = this;

      utile.each( this.RGB, function( value, key ) {
        self.RGB[ key ] = value / 255;
      });

      var min    = Math.min( self.RGB.R, self.RGB.G, self.RGB.B );
      var max    = Math.max( self.RGB.R, self.RGB.G, self.RGB.B );
      var chroma = max - min;

      self.HSV.V = max;

      if( chroma === 0 )
        return { H: 0, S: 0, V: max * 100 };

      self.HSV.S = chroma / max;

      var del = {};

      utile.each( self.RGB, function( value, key ) {
        del[key] = ((( max - value ) / 6 ) + ( chroma / 2 )) / chroma;
      });

      if( self.RGB.R === max )
        self.HSV.H = del.B - del.G;
      else if( self.RGB.G === max )
        self.HSV.H = ( 1 / 3 ) + del.R - del.B;
      else if( self.RGB.B === max )
        self.HSV.H = ( 2 / 3 ) + del.G - del.R;

      if( self.HSV.H < 0 ) self.HSV.H += 1;
      if( self.HSV.H > 1 ) self.HSV.H -= 1;
      
      self.HSV.H *= 360;
      self.HSV.S *= 100;
      self.HSV.V *= 100;

      return self.HSV;
    },

    normalize: function() {
      var self = this;

      var sum  = self.RGB.R + self.RGB.G + self.RGB.B;

      utile.each( self.RGB, function( value, key ) {
        self.RGB[key] /= sum;
        self.RGB[key] = superClass.round( self.RGB[key], 3 );
      });

      return self.RGB;
    }
  }
};

Rainbow.prototype.hex = function( hexValue ) {
  var superClass = this;

  return {
    hex: parseInt( hexValue, 16 ),
    RGB: {},

    toRGB: function() {
      var self = this;

      self.RGB.R = ( self.hex >> 16 ) & 0xFF;
      self.RGB.G = ( self.hex >> 8  ) & 0xFF;
      self.RGB.B = self.hex & 0xFF;

      return self.RGB;
    },

    toCMYK: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toCMYK();
    },

    toHSV: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toHSV();
    }
  };
};

Rainbow.prototype.hsv = function( hsvSchema ) {
  var superClass = this;

  return {
    HSV: hsvSchema,
    RGB: {},

    toRGB: function() {
      var self = this;

      var keys = Object.keys( self.HSV );

      utile.each([ 360, 100, 100 ], function( value, index ) {
        self.HSV[ keys[index] ] /= value;
      });

      var i = Math.floor( self.HSV.H * 6 );

      var f = self.HSV.H * 6 - i;
      var p = self.HSV.V * superClass.reciprocal( self.HSV.S );
      var q = self.HSV.V * superClass.reciprocal( f * self.HSV.S );
      var t = self.HSV.V * superClass.reciprocal( superClass.reciprocal( f ) * self.HSV.S );

      switch( i % 6 ) {
        case 0:
          utile.mixin( self.RGB, { R: self.HSV.V, G: t, B: p }); 
          break;
        case 1:
          utile.mixin( self.RGB, { R: q, G: self.HSV.V, B: p }); 
          break;
        case 2:
          utile.mixin( self.RGB, { R: p, G: self.HSV.V, B: t }); 
          break;
        case 3: 
          utile.mixin( self.RGB, { R: p, G: q, B: self.HSV.V }); 
          break;
        case 4:
          utile.mixin( self.RGB, { R: t, G: p, B: self.HSV.V }); 
          break;
        case 5:
          utile.mixin( self.RGB, { R: self.HSV.V, G: p, B: q }); 
          break;
      }

      utile.each( this.RGB, function( value, key ) {
        self.RGB[ key ] = value * 255;
      });

      return self.RGB;
    },

    toCMYK: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toCMYK();
    },

    toHex: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toHex();
    }
  };
};

Rainbow.prototype.cmyk = function( cmykSchema ) {
  var superClass = this;

  return {
    CMYK: cmykSchema,
    RGB: {},

    toRGB: function() {
      var self = this;

      var base = 1 - self.CMYK.K;
      
      var corrispondences = {
        'R': 'C',
        'G': 'M',
        'B': 'Y'
      };

      utile.each( corrispondences, function( value, index ) {
        self.RGB[index] = Math.round( base * superClass.reciprocal( self.CMYK[value] ) * 255 );
      });

      return self.RGB;
    },

    toHex: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toHex();
    },

    toHSV: function() {
      var self = this;
      return superClass.rgb( self.toRGB() ).toHSV();
    }
  }
};

module.exports = new Rainbow();