var Rainbow = require('../lib/rainbow')
var expect  = require('expect.js');

describe('init', function() {
  var rainbow = new Rainbow();
  it('should be an object', function(done) {

    expect( rainbow ).to.be.an('object');

    expect( rainbow._CMYK ).to.eql({ C: 0, M: 0, Y: 0, K: 0 });
    expect( rainbow._RGB ).to.eql({ R: 0, G: 0, B: 0 });
    expect( rainbow._HSV ).to.eql({ H: 0, S: 0, V: 0 });
    done();
  });
});

describe('RGB and HSV', function() {
  var rainbow = new Rainbow();
  it('should be correctly RGB color', function( done ) {
    expect( rainbow.HSVtoRGB({ H: 150, S: 1, V: 1 }) ).to.eql({ R: 0, G: 255, B: 127.5 });
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( rainbow.RGBtoHSV({ R: 0, G: 255, B: 127}) ).to.eql({ H: 149.88235294117646, S: 1, V: 255 });
    done();
  });
});

describe('RGB and hex', function() {
  var rainbow = new Rainbow();

  it('should be correctly RGB color', function( done ) {
    expect( rainbow.hexToRGB('ffffff') ).to.eql({ R: 255, G: 255, B: 255 });
    done();
  });

  it('should be correctly hex value', function( done ) {
    expect( rainbow.RGBtoHex({ R: 255, G: 255, B: 255 }) ).to.eql('ffffff');
    done();
  });
});

describe('RGB and CMYK', function() {
  var rainbow = new Rainbow();

  it('should be correctly RGB color', function( done ) {
    expect( rainbow.CMYKtoRGB({ C: 0, M: 255, Y: 0, K: -254 })).to.eql({ R: 255, G: 0, B: 255 });
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( rainbow.RGBtoCMYK({ R: 255, G: 0, B: 255 })).to.eql({ C: 0, M: 255, Y: 0, K: -254 });
    done();
  });

});