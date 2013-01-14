module.exports = function(app) {
  return function(req, res, next) {
    if (req.query.env) {
      console.log('setting environment to ' + req.query.env);
      app.set('env', req.query.env);
    }

    next();
  };
};
