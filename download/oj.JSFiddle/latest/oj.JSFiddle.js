//
// oj.JSFiddle.js v0.0.1
// ojjs.org/plugins#oj.JSFiddle
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.JSFiddle.js

(function(){

// Create plugin
var plugin = function(oj, settings){
  if (typeof settings !== 'object')
    settings = {}

  var JSFiddle = oj.createType('JSFiddle', {

    base: oj.View,

    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // Accept path as first arg
      if (args.length >= 1)
        this.path = args[0];

      // Shift properties
      var props = [
        'tabs',
        'style',
        'width',
        'height'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      // Create el
      this.el = oj(function(){

        // Calculate arguments to ghbts.com
        var order = '';
        if (!this_.user)
          throw new Error('oj.JSFiddle: user is not specified');
        user = 'user=' + this_.user
        if (this_.repo)
          repo = '&repo=' + this_.repo
        if (this_.size)
          size = '&size=' + this_.size
        if (this_.showCount)
          count = '&count=' + this_.showCount
        if (this_.type)
          type = '&type=' + this_.type

        src = "http://jsfiddle.net/" + user + repo + type + count + size;

        oj.iframe({
          src:src,
          allowtransparency:"true",
          frameborder:"0",
          scrolling:"0",
          width:this_.width,
          height:this_.height
        });
      });

      JSFiddle.base.constructor.apply(this, [options]);
    },

    properties: {
      url: 'evanmoran/WrTbE',
      tabs: 'evanmoran',
      style: null,
      width:{            // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._width || 400},
        set:function(v){this._width = v;}
      },
      height:{           // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._height || 300},
        set:function(v){this._height = v;}
      }
    },
  });

  return {JSFiddle:JSFiddle};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);