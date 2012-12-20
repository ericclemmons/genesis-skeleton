module.exports = init;

var host = 'localhost';
var port = 8000;

function init(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    less: {
      app: {
        src: 'src/client/styles/**/*.less',
        dest: 'public/dist/<%= pkg.name %>.css'
      }
    },
    concat: {
      lib: {
        src: 'public/lib/**/*.js',
        dest: 'public/dist/lib.js'
      },
      app: {
        src: [
          '<banner:meta.banner>',
          'src/client/**/*.js'
        ],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },
    min: {
      lib: {
        src: ['<config:concat.lib.dest>'],
        dest: 'public/dist/lib.min.js'
      },
      app: {
        src: ['<banner:meta.banner>', '<config:concat.app.dest>'],
        dest: 'public/dist/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      app: {
        src: ['<banner:meta.banner>', '<config:less.app.dest>'],
        dest: 'public/dist/<%= pkg.name %>.min.css'
      }
    },
    reload: {
      port: port,
      proxy: {
        host: host,
        port: port + 1
      }
    },
    watch: {
      files: ['public/**/*.less', 'public/**/*.js', 'views/*'],
      tasks: ['default', 'reload']
    },
    open: {
      all: {
        url: 'http://' + host + ':' + port + '/'
      }
    },
    server: {
      port: port + 1
    }
  });

  // Default task.
  grunt.registerTask('default', ['less', 'concat', 'min', 'cssmin']);

  // Express server
  grunt.registerTask('express-server', 'Start an express web server', function() {
    process.env.PORT = grunt.config('server.port');

    require('./src/server/app');
  });

  grunt.registerTask('server', ['default', 'express-server', 'reload', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');
};
