
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var gzippo  = require('gzippo');
var app     = express();

app.configure(function(){
  app.set('package', require('../../package.json'));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(gzippo.staticGzip(path.join(__dirname, '../../public')));
  app.use(gzippo.compress());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/views/*.html', routes.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
