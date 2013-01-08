
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var path    = require('path');
var gzippo  = require('gzippo');
var app     = module.exports = express();

app.locals.package = require('../../package.json');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(gzippo.staticGzip(path.join(__dirname, '../../public')));
app.use(gzippo.compress());

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/views/*.html', routes.view);
