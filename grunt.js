module.exports = function(grunt) {

  /**
   * Configuration
   */

  grunt.config.init({

    // Constants
    dirs: {
      client    : './src/client/',
      lib       : './components/',
      server    : './src/server/',
      web       : './public/',
      build     : './public/build/'
    },

    files: {
      img       : 'img/**/*',
      js        : 'js/**/*.js',
      less      : 'less/**/*.less',
      views     : 'views/**/*'
    },

    // Common
    pkg         : grunt.file.readJSON('package.json'),
    meta        : {
      banner    : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '                   +
                  '<%= grunt.template.today("yyyy-mm-dd") %>\\n'                                 +
                  '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'                       +
                  '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                  ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    clean:      ['<%= dirs.build %>'],
    watch:      {
      all:      {
        files   : [ '<%= dirs.server + "**/*" %>'
                    '<%= dirs.client + "**/*" %>'],
        tasks   : ['default', 'express-server', 'reload'],
        options : { interrupt: true }
      }
    },

    // Compilation
    less:       {
      app:      {
        src     : ['<%= dirs.lib %>/github-fork-ribbon-css/gh-fork-ribbon.css'
                  ,'<%= dirs.client %>/less/app.less'],
        dest    : '<%= dirs.build %>/css/<%= pkg.name %>.css'
      }
    },

    // Concatenation
    copy:       {
      app:      {
        options : {
          cwd   : '<%= dirs.client %>'
        },
        files   : { '<%= dirs.build %>img/': '<%= dirs.client + files.img %>' }
      },
      lib:      {
        options : {
          cwd   : '<%= dirs.client %>'
        },
        files   : { '<%= dirs.build %>img/': '<%= dirs.lib %>/bootstrap/<%= files.img %>' }
      }
    },
    concat:     {
      all:      {
        src     : ['<banner:meta.banner>'
                  ,'<%= dirs.lib %>/angular-1.0.3/angular.js'
                  ,'<%= dirs.lib %>/angular-1.0.3/angular-resource.js'
                  ,'<%= dirs.client %>/js/app.js'
                  ,'<%= dirs.client + files.js %>'],
        dest    : '<%= dirs.build %>/js/<%= pkg.name %>.js'
      }
    },

    // Minification
    cssmin:     {
      all:      {
        src     : ['<banner:meta.banner>', '<%= less.app.dest %>'],
        dest    : '<%= dirs.build %>/css/<%= pkg.name %>.min.css'
      }
    },
    smushit:    {
      all:      {
        src     : '<%= dirs.build %>/img'
      }
    },
    min:     {
      app:      {
        src     : ['<banner:meta.banner>', '<%= concat.all.dest %>'],
        dest    : '<%= dirs.build %>/js/<%= pkg.name %>.min.js'
      }
    },

    // Live-Reload Reverse-Proxy Server
    open:       {
      dev:      {
        url     : 'http://localhost:8000/'
      }
    },
    reload:     {
      port      : 8000,         // Browser-targeted port

      proxy:    {
        host    : 'localhost',  // Viewing port
        port    : 8001          // Source port
      }
    },
    server:     {
      port      : 8001          // Source port
    }

  });

  /**
   * Dependencies
   */

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-smushit');

  /**
   * Tasks
   */

  grunt.registerTask('default',         ['less', 'concat', 'copy']);
  grunt.registerTask('build',           ['clean','default', 'minify']);
  grunt.registerTask('minify',          ['cssmin', 'min', 'smushit'])
  grunt.registerTask('server',          ['default', 'express-server', 'reload', 'open', 'watch']);

  grunt.registerTask('express-server',  'Start an express web server', function() {
    process.env.PORT = grunt.config.get('server.port');

    return require(grunt.config.get('dirs.server') + '/app');
  });

};
