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
      img       : '**/*.{png,gif,jpg,jpeg}',
      js        : '**/*.js',
      less      : '**/*.less',
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
      lint:     {
        files   : ['grunt.js'
                  ,'<%= dirs.client + files.js %>'
                  ,'<%= dirs.server + files.js %>'],
        tasks   : ['lint']
      },
      app:      {
        files   : ['<%= dirs.client + files.js %>'
                  ,'<%= dirs.client + files.html %>'],
        tasks   : ['ngtemplates', 'concat']
      },
      server:   {
        files   : ['<%= dirs.server + files.all %>'],
        tasks   : ['express-server', 'livereload']
      },
      less:     {
        files   : ['<%= dirs.client + files.less %>'],
        tasks   : ['less']
      },
      public:   {
        files   : ['<%= dirs.public + files.all %>'],
        tasks   : ['copy:public']
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
      images:   {
        files:  [
          {
            expand: true,
            cwd   : '<%= dirs.components %>/bootstrap/img',
            src   : '<%= files.img %>',
            dest  : '<%= dirs.dist %>/img'
          },
          {
            expand: true,
            cwd   : '<%= dirs.client %>/app',
            src   : '<%= files.img %>',
            dest  : '<%= dirs.dist %>'
          }
        ]
      },
      partials  : {
        files   : [
          {
            expand: true,
            cwd   : '<%= dirs.client %>',
            src   : '<%=files.html %>',
            dest  : '<%= dirs.dist %>'
          }
        ]
      },
      components: {
        files   : [
          {
            expand: true,
            cwd   : '<%= dirs.components %>',
            src   : '<%= files.all %>',
            dest  : '<%= dirs.dist %>/components'
          }
        ]
      },
      public:     {
        files:    [
          {
            expand: true,
            cwd   : '<%= dirs.public %>',
            src   : '<%= files.all %>',
            dest  : '<%= dirs.dist %>'
          }
        ]
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
        src     : ['<%= dirs.client %>/app/<%= files.js %>', '<%= ngtemplates.app.dest %>'],
        dest    : '<%= dirs.dist %>/js/app.js'
      }
    },

    // Minification
    mincss:     {
      app:      {
        files:  {
          '<%= less.app.dest.replace(".css", ".min.css") %>': ['<%= less.app.dest %>'],
        }
      }
    },
    uglify:     {
      options:  {
        banner: '<%= meta.banner %>'
      },
      app:      {
        files:  {
          '<%= concat.app.dest.replace(".js", ".min.js") %>': '<%= concat.app.dest %>'
        }
      }
    },
    useminPrepare: {
      html      : '<%= dirs.dist %>/index.html'
    },
    usemin:     {
      html      : '<%= dirs.dist %>/index.html'
    },

    // Server & tools
    livereload  : {
      options   : {
        base    : '<%= dirs.dist %>'
      },
      files     : ['<%= dirs.dist %>/!(components)*'
                  ,'<%= dirs.dist %>/!(components)/**.*']
    },
    open:       {
      dev:      {
        url     : 'http://localhost:' + (process.env.PORT || 3000) + '/'
      }
    },
    server:     {
      script    : '<%= dirs.server %>/server.js',
      port      : process.env.PORT || 3000
    }

  });

  /**
   * Dependencies
   */

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-livereload');
  grunt.loadNpmTasks('grunt-usemin');

  /**
   * Custom tasks
   */

  grunt.loadTasks('tasks');

  /**
   * Tasks
   */

  grunt.registerTask('default', ['jshint', 'compile', 'concat', 'copy']);
  grunt.registerTask('compile', ['less', 'ngtemplates']);
  grunt.registerTask('build',   ['clean', 'default', 'minify']);
  grunt.registerTask('minify',  ['useminPrepare', 'concat', 'uglify', 'mincss', 'usemin', 'smushit']);
  grunt.registerTask('server',  ['default', 'express-server', 'livereload', 'watch']);

};
