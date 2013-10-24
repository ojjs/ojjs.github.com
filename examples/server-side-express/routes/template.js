
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('template', { title: 'OJ Express with Template' });
};