/*
 * GET /
 */

module.exports = function(req, res){
  // Render view located at /views/index.oj
  res.render('index', {title: 'Use OJ with Express'});
};