module.exports = (grunt)->

  ###
  # Configuration
  ###

  grunt.config.init

    ###
    # Constants
    ###

    dirs:
      client:       __dirname + '/src/client/'
      components:   __dirname + '/components/'
      server:       __dirname + '/src/server/'
      public:       __dirname + '/src/public/'
      dist:         __dirname + '/dist/'

    files:
      all:          '**/*'
      img:          '**/*.{png,gif,jpg,jpeg}'
      js:           '**/*.js'
      less:         '**/*.less'
      html:         '**/*.html'

    ###
    # Tasks
    ###

    clean:          '<%= dirs.dist %>'


    watch:
      app:
        files:      '<%= dirs.client + files.js %>'
        tasks:      [ 'jshint', 'concat', 'livereload' ]

      partials:
        files:      '<%= dirs.client + files.html %>'
        tasks:      [ 'copy:partials', 'ngtemplates', 'concat', 'livereload' ]

      server:
        files:      '<%= dirs.server + files.all %>'
        tasks:      [ 'jshint', 'express-server', 'livereload' ]

      less:
        files:      '<%= dirs.client + files.less %>'
        tasks:      [ 'less' ]

      public:
        files:      '<%= dirs.public + files.all %>'
        tasks:      [ 'copy:public' ]


    jshint:
      files:        [ '<%= dirs.server + files.js %>'
                      '<%= dirs.client %>/app/<%= files.js %>' ]
      options:
        es5:        true
        laxcomma:   true


    less:
      app:
        src:        '<%= dirs.client %>/app/less/app.less'
        dest:       '<%= dirs.dist %>/css/app.css'


    copy:
      images:
        files:      [
          expand:   true,
          cwd:      '<%= dirs.components %>/bootstrap/img'
          src:      '<%= files.img %>'
          dest:     '<%= dirs.dist %>/img'
        ,
          expand:   true
          cwd:      '<%= dirs.client %>/app'
          src:      '<%= files.img %>'
          dest:     '<%= dirs.dist %>'
        ]

      partials:
        files:      [
          expand:   true,
          cwd:      '<%= dirs.client %>'
          src:      '<%= files.html %>'
          dest:     '<%= dirs.dist %>'
        ]

      components:
        files:      [
          expand:   true
          cwd:      '<%= dirs.components %>'
          src:      '<%= files.all %>'
          dest:     '<%= dirs.dist %>/components'
        ]

      public:
        files:      [
          expand:   true
          cwd:      '<%= dirs.public %>'
          src:      '<%= files.all %>'
          dest:     '<%= dirs.dist %>'
        ]


    ngtemplates:
      app:
        src:        '<%= dirs.client + files.html %>'
        dest:       '<%= dirs.dist %>/js/app.templates.js'
        options:
          base:     '<%= dirs.client %>'


    concat:
      app:
        src:        [ '<%= dirs.client + files.js %>'
                      '<%= ngtemplates.app.dest %>' ]
        dest:       '<%= dirs.dist %>/js/app.js'


    mincss:
      app:
        files:
          '<%= less.app.dest.replace(".css", ".min.css") %>':
            '<%= less.app.dest %>'


    uglify:
      app:
        files:
          '<%= concat.app.dest.replace(".js", ".min.js") %>':
            '<%= concat.app.dest %>'


    useminPrepare:
      html:         '<%= dirs.dist %>/index.html'


    usemin:
      html:         '<%= dirs.dist %>/index.html'

    livereload:
      files:        [ '<%= dirs.dist %>/!(components)*'
                      '<%= dirs.dist %>/!(components)/**.*' ]
      options:
        base:       '<%= dirs.dist %>'

    server:
      script:       '<%= dirs.server %>/server.js'
      port:         process.env.PORT || 3000


  ###
  # Dependencies
  ###

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-angular-templates')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-mincss')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-livereload')
  grunt.loadNpmTasks('grunt-usemin')


  ###
  # Aliases
  ###

  grunt.registerTask('default', ['jshint', 'compile', 'concat', 'copy'])
  grunt.registerTask('compile', ['less', 'ngtemplates'])
  grunt.registerTask('build',   ['clean', 'default', 'minify'])
  grunt.registerTask('minify',  ['useminPrepare', 'concat', 'uglify', 'mincss', 'usemin', 'smushit'])
  grunt.registerTask('server',  ['default', 'express-server', 'livereload', 'watch'])
