
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    title: 'App Starter',
    author: 'Eric Clemmons',
    description: 'Modern application starter - H5BP + Angular + Express + Grunt'
  });
};

exports.view = function(req, res){
  res.render(req.params[0], {
    title: 'App Starter',
    author: 'Eric Clemmons',
    description: 'Modern application starter - H5BP + Angular + Express + Grunt'
  });
};
