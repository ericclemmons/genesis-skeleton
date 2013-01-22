var express   = require('express');
var app       = module.exports = express();

app.get('/api/package', function(req, res) {
  res.send(require('../../../../package.json'));
});
