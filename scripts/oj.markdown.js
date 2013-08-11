var marked = require('marked');
// Create a plugin by defining a function that accepts oj and returns a map of extensions to oj
module.exports = function(oj,settings){
  // Initialize marked options
  if (typeof settings !== 'object')
    settings = {}
  marked.setOptions(settings);

  // oj.markdown
  return {markdown:function(input){
    return oj.emit(marked(input));
  }};
};
