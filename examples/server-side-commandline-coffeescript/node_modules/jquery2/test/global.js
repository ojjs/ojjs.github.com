var $ = require('../jquery-2.0.3');
var assert = require("assert");

describe('$', function(){
  it('should not be global', function(){
    assert.equal(window.$, void(0));
  });
});

describe('$', function(){
  it('should be defined', function(){
    assert.equal(typeof($().jquery), 'string');
  });
});

