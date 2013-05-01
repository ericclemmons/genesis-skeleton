var express   = require('express');
var app       = module.exports = express();
var renderer  = require('./renderer');

app.use(function(req, res, next) {
  if (!req.query._escaped_fragment_) {
    return next();
  }

  var url = (req.secure ? 'https' : 'http') + '://';

  url += req.host + ':' + app.get('port') + req.path;
  url += '#!' + req.query._escaped_fragment_;

  renderer.render(url, function(html) {
    res.send(html);
  });
});
