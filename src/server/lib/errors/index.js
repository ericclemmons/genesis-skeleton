var express = require('express');
var app     = module.exports = express();

app.get('*', function(req, res) {
  res.redirect('/#' + req.url);
});

app.use(function(err, req, res, next) {
  res.redirect('/#' + req.url + (req.url.match(/\?/) ? '&' : '?') + 'err=500');
});
