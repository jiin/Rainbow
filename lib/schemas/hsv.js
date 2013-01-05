var hsv = function() {};

hsv.prototype.fromHSV = function(cs) {

  cs.h /= 360;
  cs.s /= 100;
  cs.v /= 100;

  var i = Math.floor(cs.h * 6);
  var f = cs.h * 6 - i;

  var p = cs.v * (1 - cs.s);
  var q = cs.v * (1 - (f * cs.s));
  var t = cs.v * (1 - (1 - f) * cs.s);

  var mod = i % 6;

  this.rgb = ( mod === 0 ) ? { r: cs.v, g: t, b: p } :
             ( mod === 1 ) ? { r: q, g: cs.v, b: p } :
             ( mod === 2 ) ? { r: p, g: cs.v, b: t } :
             ( mod === 3 ) ? { r: q, g: q, b: cs.v } :
             ( mod === 4 ) ? { r: t, g: p, b: cs.v } :
                             { r: cs.v, g: p, b: q } ;

  this.rgb.r *= 255;
  this.rgb.g *= 255;
  this.rgb.b *= 255;
};

hsv.prototype.toHSV = function(rgb) {
  this.hsv   = {};

  var min    = Math.min( rgb.r, rgb.g, rgb.b ) / 255;
  var max    = this.hsv.v = Math.max( rgb.r, rgb.g, rgb.b ) / 255;
  var chroma = max - min;

  if( !chroma ) {
    this.hsv = { h: 0, s: 0, v: max * 100 }
    return;
  }

  this.hsv.s = chroma / max;
  
  var del = {};

  Object.keys(rgb).forEach(function(k) {
    del[k] = (((max - rgb[k] / 255) / 6) + (chroma / 2)) / chroma;
  });

  max *= 255;

  this.hsv.h = (rgb.r === max) ? del.b - del.g :
               (rgb.g === max) ? (1 / 3) + del.r - del.b :
               (rgb.b === max) ? (2 / 3) + del.g - del.r : 0;

  if( this.hsv.h < 0 ) 
    this.hsv.h += 1;
  if( this.hsv.h > 1 )
    this.hsv.h -= 1;
    
  this.hsv.h *= 360;
  this.hsv.s *= 100;
  this.hsv.v *= 100;
};

module.exports = new hsv();