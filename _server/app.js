
/**
 * Module dependencies.
 */

var express   = require('express');
var path      = require('path');
var app       = module.exports = express();

app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.cookieParser('change this value to something unique'));
// app.use(express.cookieSession());
app.use(express.compress());
// app.use(api);
app.use(express.static(path.join(__dirname, '../')));
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('*', function(req, res) {
  res.sendfile(path.join(__dirname, '../', '404.html'));
});
