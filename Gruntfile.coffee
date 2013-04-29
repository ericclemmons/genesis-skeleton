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
      dist:
        files:      '<%= dirs.dist + files.all %>'
        tasks:      [ 'livereload', 'karma:background:run' ]

      js:
        files:      '<%= dirs.client %>/!(components)/<%= files.js %>'
        tasks:      [ 'parallel:jshint', 'copy:js' ]

      less:
        files:      '<%= dirs.client + files.less %>'
        tasks:      [ 'less' ]

      server:
        files:      '<%= dirs.server + files.all %>'
        tasks:      [ 'parallel:jshint', 'express-server', 'livereload' ]

      templates:
        files:      '<%= dirs.client + files.html %>'
        tasks:      [ 'copy:templates', 'ngtemplates' ]

    jshint:
      files:        [ '<%= dirs.server + files.js %>'
                      '<%= dirs.client %>/!(components)/<%= files.js %>' ]
      options:
        es5:        true
        laxcomma:   true


    karma:
      options:
        configFile: 'karma.conf.js'

      background:
        background: true
        singleRun:  false

      browsers:
        browsers:   [ 'PhantomJS', 'ChromeCanary' ]
        background: true
        singleRun:  false

      unit:         {}


    less:
      '<%= dirs.dist %>/app/css/app.css': '<%= dirs.client %>/app/less/app.less'

    copy:
      images:
        files:      [
          expand:   true,
          cwd:      '<%= dirs.components %>/bootstrap/img'
          src:      '<%= files.img %>'
          dest:     '<%= dirs.dist %>/img'
        ,
          expand:   true
          cwd:      '<%= dirs.client %>'
          src:      [ '<%= files.img %>', '!**/components/<%= files.img %>' ]
          dest:     '<%= dirs.dist %>'
        ]

      client:
        files:      [
          expand:   true
          cwd:      '<%= dirs.client %>'
          src:      '<%= files.all %>'
          dest:     '<%= dirs.dist %>'
        ]

      js:
        files:      [
          expand:   true
          cwd:      '<%= dirs.client %>'
          src:      [ '<%= files.js %>', '!**/components/<%= files.js %>' ]
          dest:     '<%= dirs.dist %>'
        ]

      templates:
        files:      [
          expand:   true
          cwd:      '<%= dirs.client %>'
          src:      '<%= files.html %>'
          dest:     '<%= dirs.dist %>'
        ]

    ngtemplates:
      app:
        src:        '<%= dirs.dist %>/app/<%= files.html %>'
        dest:       '<%= dirs.dist %>/app/js/app.templates.js'
        options:
          base:     '<%= dirs.dist %>'

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

  grunt.registerTask('default',       [ 'prepare' ])
  grunt.registerTask('server',        [ 'prepare', 'livereload-start', 'karma:background', 'express-server', 'regarde' ])
  grunt.registerTask('build',         [ 'prepare', 'optimize' ])
  grunt.registerTask('prepare',       [ 'clean', 'jshint', 'copy', 'ngtemplates', 'less' ])
  grunt.registerTask('optimize',      [ 'useminPrepare', 'concat', 'uglify', 'mincss', 'usemin' ])
  grunt.registerTask('test',          [ 'prepare', 'karma:unit' ])
  grunt.registerTask('test:browsers', [ 'karma:browsers', 'server' ])
