module.exports = (grunt)->

  ###
  # Configuration
  ###

  grunt.config.init

    ###
    # Constants
    ###

    dirs:
      client:       'client/'
      components:   'client/components/'
      dist:         'dist/'
      server:       'server/'
      test:         'test/'

    files:
      all:          '**/*'
      css:          '**/*.css'
      img:          '**/*.{png,gif,jpg,jpeg}'
      js:           '**/*.js'
      less:         '**/*.less'
      html:         '**/*.html'

    ###
    # Tasks
    ###

    clean:
      dist:         '<%= dirs.dist %>'


    parallel:
      jshint:       [ grunt: true, args: [ 'jshint' ] ]


    regarde:
      client:
        files:      '<%= dirs.client + files.all %>'
        tasks:      [ 'copy:client', 'parallel:jshint', 'less', 'livereload' ]

      server:
        files:      '<%= dirs.server + files.all %>'
        tasks:      [ 'parallel:jshint', 'express-server', 'livereload' ]

      test:
        files:      '<%= dirs.test + files.all %>'
        tasks:      [ 'parallel:jshint', 'karma:app:run']


    jshint:
      files:        [ '<%= dirs.server + files.js %>'
                      '<%= dirs.client %>/!(components)/<%= files.js %>'
                      '<%= dirs.test + files.js %>' ]
      options:
        es5:        true
        laxcomma:   true


    karma:
      options:
        configFile: '<%= dirs.test %>/karma.conf.js'
      test:
        singleRun:  true


    less:
      app:
        expand:     true
        cwd:        '<%= dirs.dist %>/app/'
        dest:       '<%= less.app.cwd %>'
        src:        '<%= files.less %>'
        ext:        '.css'


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

      client:
        files:      [
          expand:   true
          cwd:      '<%= dirs.client %>'
          src:      '<%= files.all %>'
          dest:     '<%= dirs.dist %>'
        ]

    ngtemplates:
      app:
        src:        '<%= dirs.dist %>/app/<%= files.html %>'
        dest:       '<%= dirs.dist %>/app/js/app.templates.js'
        options:
          base:     '<%= dirs.client %>'

    mincss:
      app:
        expand:     true
        cwd:        '<%= dirs.dist %>'
        src:        ['<%= files.css %>', '!**/components/<%= files.css %>']
        dest:       '<%= dirs.dist %>'
        ext:        '.min.css'


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

  grunt.loadNpmTasks('grunt-angular-templates')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-mincss')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-express-server')
  grunt.loadNpmTasks('grunt-karma')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-parallel')
  grunt.loadNpmTasks('grunt-usemin')


  ###
  # Alias Tasks
  #
  # - `grunt server` for local development
  # - `grunt build` when deploying
  ###

  grunt.registerTask('default',   [ 'validate', 'prepare' ])
  grunt.registerTask('server',    [ 'clean', 'default', 'express' ])
  grunt.registerTask('build',     [ 'clean', 'prepare', 'ngtemplates', 'optimize' ])
  grunt.registerTask('validate',  [ 'jshint' ])
  grunt.registerTask('prepare',   [ 'copy', 'less' ])
  grunt.registerTask('express',   [ 'livereload-start', 'express-server', 'regarde' ])
  grunt.registerTask('optimize',  [ 'useminPrepare', 'concat', 'uglify', 'mincss', 'usemin' ])
  grunt.registerTask('test',      [ 'validate', 'karma' ])
