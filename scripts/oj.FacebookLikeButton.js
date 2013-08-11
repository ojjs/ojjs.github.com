// oj.FacebookLikeButton.js

(function(){

// Create plugin
var plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {}

  var FacebookLikeButton = oj.createType('FacebookLikeButton', {

    base: oj.View,

    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // First argument is username
      if(args.length > 0)
        this.username = args[0];

      // Shift properties
      var props = [
        'href',               // http://url/to/like
        'showSend',           // 'true' or 'false'
        'colorScheme',        // 'light' or 'dark'
        'layout',             // 'standard', 'box_count', 'button_count',
        'action',             // 'like' or 'recommend'
        'font',               // 'lucida grande', 'arial', 'seqoe ui', 'tahoma', 'trebuchet ms', 'verdana'
        'width'               // width to render within (integer only, no px)
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      // Create el
      this.el = oj(function(){
        var href = null, send = null, layout = null, width = null, showFaces = null, font = null;

        oj.div({c:'fb-like', dataHref:'http://myurl/to/like', dataSend:'true', dataLayout:'button_count', dataWidth:'450', dataShowFaces:'false'});

        // if (this_.size)
        //   size = {'data-size':this_.size.toString()};
        // if (!this_.showTailoring)
        //   tailor = {'data-dnt':(!this_.showTailoring).toString()};
        // var href = {'data-href':this.url};
        // var send = {'data-send'}

        // oj.div(c:'fb-like', 'data')
        // <div class="fb-like" data-href="http://myurl/to/like" data-send="true" data-layout="button_count" data-width="1000" data-show-faces="false" data-font="arial"></div>

        // oj.a("Follow @" + this_.username, {
        //     href: 'https://twitter.com/' + this_.username.toString(),
        //     c:'twitter-follow-button',
        //     'data-show-count':this_.showCount.toString(),
        //     'data-show-screen-name':this_.showUsername.toString(),
        //     style:{display:'none'}
        //   },
        //   tailor,
        //   size
        // );
      });

      FacebookLikeButton.base.constructor.apply(this, [options]);

      this.loadFacebookAPI();
    },
    properties: {

      href:'http://ojjs.org',
      showSend:false,         // false or true
      colorScheme:'light',    // 'light' or 'dark'
      layout:'standard',      // 'standard', 'box_count', 'button_count',
      action:'like',          // 'like' or 'recommend'
      font:'arial',           // 'lucida grande', 'arial', 'seqoe ui', 'tahoma', 'trebuchet ms', 'verdana'
      width:450               // width to render within (integer only, no px)

      // TODO: Add appid support
    },

    methods: {
      loadFacebookAPI:function(){

        if (oj.isClient && !FacebookLikeButton._loaded) {
          var p=/^http:/.test(document.location)?'http':'https';
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = p + "://connect.facebook.net/en_US/all.js#xfbml=1";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));

          FacebookLikeButton._loaded = true;
        }
      }
    }
  });

  return {FacebookLikeButton:FacebookLikeButton};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);