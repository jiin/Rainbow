var Rainbow = require('../lib/rainbow');
var expect  = require('expect.js');

describe('init', function() {
  var rainbow = new Rainbow({ r: 255, g: 255, b: 255 });
  it('should be an object', function(done) {
    expect( rainbow ).to.be.an('object');
    done();
  });
});

describe('From RGB', function() {
  var rgb = new Rainbow({ r: 255, g: 255, b: 255 });

  it('should be correctly RGB color', function( done ) {
    expect( rgb.rgb ).to.eql({ r: 255, g: 255, b: 255 });
    done();
  });

  it('should be correctly hex color', function( done ) {
    expect( rgb.hex ).to.eql('ffffff');
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( rgb.hsv ).to.eql({ h: 0, s: 0, v: 100 });
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( rgb.cmyk ).to.eql({ c: 0, m: 0, y: 0, k: 0 });
    done();
  });
});

describe('From hex', function() {
  var hex = new Rainbow('ffffff');

  it('should be correctly RGB color', function( done ) {
    expect( hex.rgb ).to.eql({ r: 255, g: 255, b: 255 });
    done();
  });

  it('should be correctly hex color', function( done ) {
    expect( hex.hex ).to.eql('ffffff');
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( hex.hsv ).to.eql({ h: 0, s: 0, v: 100 });
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( hex.cmyk ).to.eql({ c: 0, m: 0, y: 0, k: 0 });
    done();
  });
<<<<<<< HEAD
});
=======
});

describe('From HSV', function() {
  var hsv = new Rainbow({ h: 0, s: 0, v: 100 });

  it('should be correctly RGB color', function( done ) {
    expect( hsv.rgb ).to.eql({ r: 255, g: 255, b: 255 });
    done();
  });

  it('should be correctly hex color', function( done ) {
    expect( hsv.hex ).to.eql('ffffff');
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( hsv.hsv ).to.eql({ h: 0, s: 0, v: 100 });
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( hsv.cmyk ).to.eql({ c: 0, m: 0, y: 0, k: 0 });
    done();
  });
});

describe('From CMYK', function() {
  var hsv = new Rainbow({ c: 0, m: 0, y: 0, k: 0 });

  it('should be correctly RGB color', function( done ) {
    expect( hsv.rgb ).to.eql({ r: 255, g: 255, b: 255 });
    done();
  });

  it('should be correctly hex color', function( done ) {
    expect( hsv.hex ).to.eql('ffffff');
    done();
  });

  it('should be correctly HSV color', function( done ) {
    expect( hsv.hsv ).to.eql({ h: 0, s: 0, v: 100 });
    done();
  });

  it('should be correctly CMYK color', function( done ) {
    expect( hsv.cmyk ).to.eql({ c: 0, m: 0, y: 0, k: 0 });
    done();
  });
});
>>>>>>> release 0.1.0
