module.exports = function(grunt) {

  /**
   * Configuration
   */

  grunt.config.init({

    // Constants
    dirs: {
      client    : __dirname + '/src/client/',
      components: __dirname + '/components/',
      server    : __dirname + '/src/server/',
      public    : __dirname + '/src/public/',
      dist      : __dirname + '/dist/'
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
    clean:      ['<%= dirs.dist %>'],
    watch:      {
      all:      {
        files   : ['grunt.js'
                  ,'<%= dirs.server + files.all %>'
                  ,'<%= dirs.client %>/app/<%= files.all %>'],
        tasks   : ['lint', 'compile', 'concat:app', 'copy:public', 'copy:app', 'express-server', 'reload'],
        options : { interrupt: true }
      }
    },

    // Code validation
    lint:       {
      files     : ['grunt.js'
                  ,'<%= dirs.server + files.js %>'
                  ,'<%= dirs.client %>/app/<%= files.js %>']
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
        src     : ['<%= dirs.client %>/app/less/app.less'],
        dest    : '<%= dirs.dist %>/css/app.css'
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
          cwd   : '<%= dirs.client %>/app'
        },
        files   : { '<%= dirs.dist %>/img/': '<%= dirs.client %>/app/<%= files.img %>' }
      },
      bootstrap : {
        options : {
          cwd   : '<%= dirs.components %>'
        },
        files   : { '<%= dirs.dist %>/img/': '<%= dirs.components %>/bootstrap/<%= files.img %>' }
      },
      components: {
        options : {
          cwd   : '<%= dirs.components %>',
        },
        files : { '<%= dirs.dist %>/components/': '<%= dirs.components + files.all %>' }
      },
      public:     {
        options : {
          cwd   : '<%= dirs.public %>'
        },
        files   : { '<%= dirs.dist %>/' : '<%= dirs.public + files.all %>' }
      }
    },
    ngtemplates:{
      app:      {
        options : {
          base  : '<%= dirs.client %>/app'
        },
        src     : ['<%= dirs.client %>/app/<%= files.html %>'],
        dest    : '<%= dirs.dist %>/js/app.templates.js'
      }
    },
    concat:     {
      app:      {
        src     : ['<banner:meta.banner>'
                  ,'<%= dirs.client %>/app/<%= files.js %>'
                  ,'<%= ngtemplates.app.dest %>'],
        dest    : '<%= dirs.dist %>/js/app.js'
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
        src     : '<%= dirs.dist %>/img'
      }
    },
    min:        {
      app:      {
        src     : ['<banner:meta.banner>', '<%= concat.app.dest %>'],
        dest    : '<%= concat.app.dest.replace(".js", ".min.js") %>'
      }
    },
    useminPrepare: {
      html      : '<%= dirs.dist %>/index.html'
    },
    usemin:     {
      html      : '<%= dirs.dist %>/index.html'
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
  grunt.loadNpmTasks('grunt-usemin');

  /**
   * Custom tasks
   */

  grunt.loadTasks('tasks');

  /**
   * Tasks
   */

  grunt.registerTask('default', ['lint', 'compile', 'concat', 'copy']);
  grunt.registerTask('compile', ['less', 'ngtemplates']);
  grunt.registerTask('build',   ['clean', 'default', 'minify']);
  grunt.registerTask('minify',  ['useminPrepare', 'concat', 'min', 'cssmin', 'requirejs', 'usemin', 'smushit']);
  grunt.registerTask('server',  ['default', 'express-server', 'reload', 'watch']);

};
