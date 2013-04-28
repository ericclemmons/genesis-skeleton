var express   = require('express');
var app       = module.exports = express();
var fs        = require('fs');
var path      = require('path');

app.get('/api/config/:filename.json', function(req, res) {
  var filepath = path.join(__dirname, '../../../' + req.params.filename + '.json');
  fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) {
      res.send({ error: 'file not found' });
    }
    res.send(data);
  });
});
