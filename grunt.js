/**
 * Constants
 */

var HTTP_PORT   = 8000;
var HTTP_HOST   = 'localhost';
var CLIENT_DIR  = './src/client/';
var DIST_DIR    = './src/client/dist/';
var SERVER_DIR  = './src/server/';
var EJS         = 'views/**/*.ejs';
var LESS        = 'less/**/*.less';
var JS          = 'js/**/*.js';

// Paths/Patterns for dependencies
var LIBS = [
  CLIENT_DIR + 'lib/angular-1.0.3/angular.js',
  CLIENT_DIR + 'lib/angular-1.0.3/angular-resource.js',
];

module.exports = function(grunt) {

  var _ = grunt.utils._;

  /**
   * Dependencies
   */

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');

  /**
   * Tasks
   */

  grunt.registerTask('default',         ['less', 'concat', 'min', 'cssmin']);
  grunt.registerTask('server',          ['default', 'express-server', 'reload', 'open', 'watch']);
  grunt.registerTask('express-server',  'Start an express web server', function() {
    process.env.PORT = grunt.config('server.port');

    return require(SERVER_DIR + '/app');
  });

  /**
   * Configuration
   */

  grunt.initConfig({

    // Common
    pkg       : '<json:package.json>',
    meta      : {
      banner  : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '                   +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n'                                 +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>'                       +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    watch:    {
      files   : [SERVER_DIR + EJS, SERVER_DIR + JS, CLIENT_DIR + LESS, CLIENT_DIR + JS],
      tasks   : ['default', 'reload']
    },

    // Compilation
    less:     {
      app:    {
        src   : CLIENT_DIR + 'less/app.less',
        dest  : DIST_DIR + '<%= pkg.name %>.css'
      }
    },

    // Concatenation
    concat:   {
      lib:    {
        src   : LIBS,
        dest  : DIST_DIR + 'lib.js'
      },
      app:    {
        src   : ['<banner:meta.banner>', CLIENT_DIR + JS],
        dest  : DIST_DIR + '<%= pkg.name %>.js'
      }
    },

    // Minification
    min: {
      lib:    {
        src   : ['<config:concat.lib.dest>'],
        dest  : DIST_DIR + 'lib.min.js'
      },
      app:    {
        src   : ['<banner:meta.banner>', '<config:concat.app.dest>'],
        dest  : DIST_DIR + '<%= pkg.name %>.min.js'
      }
    },
    cssmin:   {
      app:    {
        src   : ['<banner:meta.banner>', '<config:less.app.dest>'],
        dest  : DIST_DIR + '<%= pkg.name %>.min.css'
      }
    },

    // Live-Reload Reverse-Proxy Server
    open:     {
      dev:    {
        url   : 'http://' + HTTP_HOST + ':' + HTTP_PORT + '/'
      }
    },
    reload:   {
      port    : HTTP_PORT,    // Browser-targeted port

      proxy:  {
        host  : HTTP_HOST,    // Viewing port
        port  : HTTP_PORT + 1 // Source port
      }
    },
    server: {
      port    : HTTP_PORT + 1 // Source port
    }

  });

};
