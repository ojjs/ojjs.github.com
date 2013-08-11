var mustache = require('mustache');
module.exports = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {}

  // oj.mustache
  return {mustache:function(){
    var u, template, view, args;
    u = oj.argumentsUnion(arguments);
    view = u.options;
    args = u.args;
    if (args.length == 0 || args.length > 1)
      throw new Error('oj.mustache: expected one template');
    template = args[0]
    return oj.emit(mustache.to_html(template, view));
  }};
};