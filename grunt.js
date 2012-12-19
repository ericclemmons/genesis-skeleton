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
    lint: {
      files: [
        'routes/**/*.js',
        'test/**/*.js',
        'public/**/*.js'
      ]
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'public/scripts/**/*.js'
        ],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'public/dist/<%= pkg.name %>.min.js'
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
      files: ['<config:lint.files>', 'views/*'],
      tasks: ['lint', 'concat', 'reload']
    },
    open: {
      all: {
        url: 'http://' + host + ':' + port + '/'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {},
    server: {
      port: port + 1
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');

  // Express server
  grunt.registerTask('express-server', 'Start an express web server', function() {
    process.env.PORT = grunt.config('server.port');

    require('./app');
  });

  grunt.registerTask('server', 'express-server reload watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');
};
