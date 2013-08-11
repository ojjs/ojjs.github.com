
// Bootstrap plugin
plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {};

  var Bootstrap = {};

  Bootstrap.Table = oj.createType('Table', {
    base:oj.Table,
    constructor:function(){
      // Add class 'table'
      var options, args, _ref;
      _ref = oj.argumentsUnion(arguments);
      options = _ref.options;
      args = _ref.args;

      if(options.c == null)
        options.c = ['table'];
      else if(oj.isString(options.c))
        options.c = ['table'].concat(options.c.split(' '));
      else if (oj.isString(options.c))
        options.c = ['table'].concat(options.c.concat);

      Bootstrap.Table.base.constructor.apply(this, [options].concat(args));
    },
    properties: {
    },
    methods: {
    }
  });

  return {Bootstrap:Bootstrap};
};

module.exports = plugin;
