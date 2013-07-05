basePath = '';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'bower_components/modernizr/modernizr.js',
  'bower_components/jquery/jquery.js',
  'bower_components/lodash/dist/lodash.js',
  'bower_components/backbone/backbone.js',
  'bower_components/react/react.js',
  'build/app/scripts/**/all.js',
  'build/app/test/unit/**/*Spec.js'
];

reporters       = [ 'dots' ];       // 'dots', 'progress', 'junit'
port            = 9876;
runnerPort      = 9100;
colors          = true;
logLevel        = LOG_INFO;         // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
autoWatch       = false;            // Watch for file changes
browsers        = [ ];  // Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
captureTimeout  = 120 * 1000;
singleRun       = true;             // Exit upon completion
