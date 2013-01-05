// rainbow.js

var hex   = require('./schemas/hex');
var cmyk  = require('./schemas/cmyk');
var hsv   = require('./schemas/hsv');

var Rainbow = function( cs ) {
  this.cs     = cs;
  this.format = ['Hex','CMYK','HSV'];
  this.rgb    = {};

  if(typeof cs == 'object') 
    this.type = Object.keys( this.cs ).join('').toUpperCase();

  (typeof cs == 'string') ? this.fromHex()  :
  (this.type == 'HSV' )   ? this.fromHSV()  :
  (this.type == 'CMYK')   ? this.fromCMYK() :
  (this.type == 'RGB' )   ? this.fromRGB()  : this.incorrectFormat(); 
};

Rainbow.prototype.incorrectFormat = function() {
  throw new Error('Incorrect format!');
};

Rainbow.prototype._findall = function() {
  (this.format).forEach( function( to ) {
    this['to' + to]();
  }, this);
};

Rainbow.prototype.fromRGB = function() {
  this.rgb = this.cs;

  this._findall();
};

Rainbow.prototype.fromHex = function() {
  this.hex = this.cs;
  hex.fromHex.call(this, this.cs);

  this._findall();
};

Rainbow.prototype.fromCMYK = function() {
  this.cmyk = this.cs;
  cmyk.fromCMYK.call(this, this.cs);

  this._findall();
};

Rainbow.prototype.fromHSV = function() {
  this.hsv = this.cs;
  hsv.fromHSV.call(this, this.cs);

  this._findall();
};

Rainbow.prototype.toHex = function() {
  hex.toHex.call(this, this.rgb);
};

Rainbow.prototype.toHSV = function() {
  hsv.toHSV.call(this, this.rgb);
};

Rainbow.prototype.toCMYK = function() {
  cmyk.toCMYK.call(this, this.rgb);
};

module.exports = Rainbow;