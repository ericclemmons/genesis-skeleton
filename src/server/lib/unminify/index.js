var twig = require('twig');

// Adds twig "unminify" filter, that removes ".min" from a js or css path if debug mode is set
twig.extendFilter('unminify', function(path){
  if (this.context.debug) {
    path = path.replace(/\.min\.(js|css)/g, '.$1');
  }

  return path;
});

exports.allow = function(app) {
  // Sets session variable "debug" based on query ?debug=
  function environmentQuery(req, res){
    if (req.query.hasOwnProperty('debug')) {
      req.session.debug = ('yes|on|true|1').split('|').indexOf(req.query.debug) !== -1;
      if (req.query.debug === 'null') {
        delete req.session.debug;
      }
    }
  }

  // Injects debug into res.locals for use in twig minify (or other) extension
  function setDebugMode(req, res){
    var isDebug;

    if (req.session && req.session.hasOwnProperty('debug')) {
      isDebug = req.session.debug;
    } else {
      isDebug = ('development' === app.settings.env);
    }
    res.locals.debug = isDebug;
  }

  // Returned middleware
  return function(req, res, next) {
    environmentQuery(req, res);
    setDebugMode(req, res);

    next();
  };
};
