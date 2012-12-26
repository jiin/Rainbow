var Rainbow = require('../lib/rainbow');
var expect  = require('expect.js');


describe('init', function() {
  it('should be an object', function(done) {
    expect( Rainbow ).to.be.an('object');
    done();
  });
});

describe('RGB and HSV', function() {
  it('should be correctly RGB color', function( done ) {
    expect( Rainbow.hsv({ H: 300, S: 100, V: 100 }).toRGB() ).to.eql({ R: 255, G: 0, B: 255 });
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( Rainbow.rgb({ R: 255, G: 0, B: 255 }).toHSV() ).to.eql({ H: 300, S: 100, V: 100 });
    done();
  });
});

describe('RGB and hex', function() {
  it('should be correctly RGB color', function( done ) {
    expect( Rainbow.hex('ffffff').toRGB() ).to.eql({ R: 255, G: 255, B: 255 })
    done();
  });


  it('should be correctly hex value', function( done ) {
    expect( Rainbow.rgb({ R: 255, G: 255, B: 255 }).toHex() ).to.eql('ffffff');
    done();
  });
});

describe('RGB and CMYK', function() {
  it('should be correctly RGB color', function( done ) {
    expect( Rainbow.cmyk({ C: 0, M: 1, Y: 0, K: 0 }).toRGB() ).to.eql({ R: 255, G: 0, B: 255 })
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( Rainbow.rgb({ R: 255, G: 0, B: 255 }).toCMYK()  ).to.eql({ C: 0, M: 1, Y: 0, K: 0 });
    done();
  });
});

/*

    expect( Rainbow.rgb({ R: 255, G: 0, B: 255 }).toCMYK()  ).to.eql({ C: 0, M: 1, Y: 0, K: 0 });
    expect( Rainbow.rgb({ R: 255, G: 0, B: 255 }).toHSV()   ).to.eql({ H: 300, S: 100, V: 100 });
    
    expect( Rainbow.hex('ffffff').toRGB() ).to.eql({ R: 255, G: 255, B: 255 })
    expect( Rainbow.hex('0000ff').toCMYK() ).to.eql({ C: 1, M: 1, Y: 0, K: 0 });
    expect( Rainbow.hex('ff00ff').toHSV() ).to.eql({ H: 300, S: 100, V: 100 });

    expect( Rainbow.hsv({ H: 300, S: 100, V: 100 }).toRGB() ).to.eql({ R: 255, G: 0, B: 255 });

    expect( Rainbow.cmyk({ C: 0, M: 1, Y: 0, K: 0 }).toRGB() ).to.eql({ R: 255, G: 0, B: 255 })
    expect( Rainbow.cmyk({ C: 0, M: 1, Y: 0, K: 0 }).toHSV() ).to.eql({ H: 300, S: 100, V: 100 })

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

});*/