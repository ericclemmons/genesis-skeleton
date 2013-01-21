var express = require('express');
var app     = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

app.get('*', function(req, res) {
  res.render('404', { url: req.url });
});
