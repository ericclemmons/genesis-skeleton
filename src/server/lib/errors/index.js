var express = require('express');
var app     = module.exports = express();

app.get('*(views|partials|templates)*.(html|htm)', function(req, res) {
  res.send(404, { error: req.url + ' cannot be found' });
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.url);
});

app.use(function(err, req, res, next) {
  res.redirect('/#' + req.url + (req.url.match(/\?/) ? '&' : '?') + 'err=500');
});
