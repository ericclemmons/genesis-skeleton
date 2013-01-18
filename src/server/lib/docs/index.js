var express = require('express');
var app     = module.exports = express();

app.locals.package = require('../../../../package.json');
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

app.get('/docs/:page?', function(req, res) {
  res.render(req.params.page || 'index');
});
