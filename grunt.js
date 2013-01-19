module.exports = function(grunt) {

  /**
   * Configuration
   */

  grunt.config.init({

    // Constants
    dirs: {
      client    : __dirname + '/src/client/',
      lib       : __dirname + '/components/',
      server    : __dirname + '/src/server/',
      web       : __dirname + '/public/',
      build     : __dirname + '/public/build/'
    },

    files: {
      all       : '**/*',
      img       : 'img/**/*',
      js        : '**/*.js',
      less      : 'less/**/*.less',
      html      : '**/*.html'
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
        files   : ['grunt.js'
                  ,'<%= dirs.server + files.all %>'
                  ,'<%= dirs.client + files.all %>'],
        tasks   : ['default', 'express-server', 'reload'],
        options : { interrupt: true }
      }
    },

    // Code validation
    lint:       {
      files     : ['grunt.js'
                  ,'<%= dirs.server + files.js %>'
                  ,'<%= dirs.client + files.js %>']
    },
    jshint:     {
      options:  {
        es5:      true,
        laxcomma: true
      }
    },

    // Compilation
    less:       {
      app:      {
        src     : ['<%= dirs.lib %>/github-fork-ribbon-css/gh-fork-ribbon.css'
                  ,'<%= dirs.client %>/less/app.less'],
        dest    : '<%= dirs.build %>/css/app.css'
      }
    },
    requirejs:  {
      compile:  {
        options:{
          cssIn : '<%= less.app.dest %>',
          out   : '<%= less.app.dest %>'
        }
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
    ngtemplates:{
      app:      {
        options : {
          base  : '<%= dirs.client %>'
        },
        src     : ['<%= dirs.client + files.html %>'],
        dest    : '<%= dirs.build %>/js/templates.js'
      }
    },
    concat:     {
      angular:  {
        src     : ['<%= dirs.lib %>/angular-1.0.3/angular.js'
                  ,'<%= dirs.lib %>/angular-1.0.3/angular-resource.js'
                  ,'<%= dirs.lib %>/angular-strap/dist/angular-strap.js'],
        dest    : '<%= dirs.build %>/js/lib/angular.js'
      },
      app:      {
        src     : ['<banner:meta.banner>'
                  ,'<%= dirs.client + files.js %>'
                  ,'<%= ngtemplates.app.dest %>'],
        dest    : '<%= dirs.build %>/js/app.js'
      },
      all:      {
        src     : ['<banner:meta.banner>'
                  ,'<%= concat.angular.dest %>'
                  ,'<%= concat.app.dest %>'],
        dest    : '<%= dirs.build %>/js/all.js'
      }
    },

    // Minification
    cssmin:     {
      app:      {
        src     : ['<banner:meta.banner>', '<%= less.app.dest %>'],
        dest    : '<%= less.app.dest.replace(".css", ".min.css") %>'
      }
    },
    smushit:    {
      all:      {
        src     : '<%= dirs.build %>/img'
      }
    },
    min:        {
      angular:  {
        src     : '<%= concat.angular.dest %>',
        dest    : '<%= concat.angular.dest.replace(".js", ".min.js") %>'
      },
      app:      {
        src     : ['<banner:meta.banner>', '<%= concat.app.dest %>'],
        dest    : '<%= concat.app.dest.replace(".js", ".min.js") %>'
      },
      all:      {
        src     : ['<banner:meta.banner>', '<%= concat.all.dest %>'],
        dest    : '<%= concat.all.dest.replace(".js", ".min.js") %>'
      }
    },

    // Live-Reload Reverse-Proxy Server
    open:       {
      dev:      {
        url     : 'http://localhost:' + (process.env.PORT || 3000) + '/'
      }
    },
    reload:     {
      port      : process.env.PORT || 3000, // Browser-targeted port

      proxy:    {
        host    : 'localhost',
        port    : 3001 // Source port
      }
    },
    server:     {
      script    : '<%= dirs.server %>/server.js',
      port      : 3001 // Source Port
    }

  });

  /**
   * Dependencies
   */

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-smushit');

  /**
   * Custom tasks
   */

  grunt.loadTasks('tasks');

  /**
   * Tasks
   */

  grunt.registerTask('default',         ['lint', 'compile', 'concat', 'copy']);
  grunt.registerTask('compile',         ['less', 'requirejs', 'ngtemplates']);
  grunt.registerTask('build',           ['clean', 'default', 'minify']);
  grunt.registerTask('minify',          ['cssmin', 'min', 'smushit']);
  grunt.registerTask('server',          ['default', 'express-server', 'reload', 'open', 'watch']);

};
