var express = require('express');
var app     = module.exports = express();

app.get('/fail', function(req, res, next) {
  console.log('attempting to trigger 500...');
  var a = b[d]; // breakage

  next();
});

app.get('*', function(req, res) {
  console.log('404 ERROR:', req.url);
  res.redirect('/#' + req.url);
});

app.use(function(err, req, res, next) {
  console.log('500 ERROR:', req.url);
  res.redirect('/#/error' + req.url);
});
