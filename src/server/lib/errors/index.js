var express = require('express');
var app     = module.exports = express();

app.get('*', function(req, res) {
  console.log('404 ERROR:', req.url);
  res.redirect('/#' + req.url);
});

app.use(function(err, req, res, next) {
  console.log('500 ERROR:', req.url);
  res.redirect('/#/error' + req.url);
});
