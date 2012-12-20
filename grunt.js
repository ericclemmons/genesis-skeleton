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
      development: {
        files: {
          'public/dist/<%= pkg.name %>.css': 'public/styles/**/*.less'
        }
      }
    },
    lint: {
      files: [
        'routes/**/*.js',
        'test/**/*.js',
        'public/scripts/**/*.js'
      ]
    },
    concat: {
      vendors: {
        src: 'public/vendors/**/*.js',
        dest: 'public/dist/vendors.js'
      },
      app: {
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
      files: ['<config:lint.files>', 'public/**/*.less', 'public/**/*.js', 'views/*'],
      tasks: ['default', 'reload']
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
        angular: true,
        console: true,
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
  grunt.registerTask('default', 'lint less concat');

  // Express server
  grunt.registerTask('express-server', 'Start an express web server', function() {
    process.env.PORT = grunt.config('server.port');

    require('./app');
  });

  grunt.registerTask('server', 'default express-server reload watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');
};
