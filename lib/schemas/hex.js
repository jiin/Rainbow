var hex = function() {};

hex.prototype.fromHex = function(cs) {
  var values  = [];

  cs.replace( /(.{1,2})/g, function(token) {
    values.push( parseInt(token, 16) );
  }, this);

  ['r','g','b'].forEach(function(x, i) {
    this.rgb[x] = values[i];
  }, this);
};

hex.prototype.toHex = function(rgb) {
  this.hex = Object.keys( this.rgb ).map(function(token) {
    var pad = rgb[token].toString(16);
    return (pad.length == 1) ? '0' + pad : pad;
  }).join('');
};

module.exports = new hex();