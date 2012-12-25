
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.view = function(req, res){
  res.render(req.params[0]);
};
