var http  = require('http');
var app   = require('./app');

module.exports = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
