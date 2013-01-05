var cmyk = function() {};

cmyk.prototype.fromCMYK = function(cs) {
  var rgb  = [];

  Object.keys(this.cs).slice(0, -1).forEach(function(x) {
    rgb.push(Math.floor((1 - cs.k) * (1 - cs[x]) * 255));
  });

  ['r','g','b'].forEach(function(x,i) {
    this.rgb[x] = rgb[i];
  }, this);
};

cmyk.prototype.toCMYK = function(rgb) {
  this.cmyk = {
    c: 1 - rgb.r / 255,
    m: 1 - rgb.g / 255,
    y: 1 - rgb.b / 255
  };

  var values = Object.keys(this.cmyk).map(function(k) { 
    return this.cmyk[k];
  }, this);

  this.cmyk.k = Math.min.apply(Math, values);

  Object.keys(this.cmyk).forEach(function(x) {
    return ( x - this.cmyk.k ) / ( 1 - this.cmyk.k );
  }, this);
};

module.exports = new cmyk();