
/**
 * Module dependencies.
 */

var express   = require('express');
var path      = require('path');
var app       = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('change this value to something unique'));
app.use(express.cookieSession());
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(express.compress());
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/package', function(req, res) {
  res.send(require('../../package.json'));
});
