
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
