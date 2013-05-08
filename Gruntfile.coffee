module.exports = (grunt)->

  # Run `grunt server` for live-reloading development environment
  grunt.registerTask('server', [ 'build', 'livereload-start', 'karma:background', 'express-server', 'regarde' ])

  # Run `grunt test` (used by `npm test`) for continuous integration (e.g. Travis)
  grunt.registerTask('test', [ 'build', 'karma:unit' ])

  # Run `grunt test:browsers` for real-world browser testing
  grunt.registerTask('test:browsers', [ 'karma:browsers', 'server' ])

  # Validate & compile web-accessible resources
  grunt.registerTask('build', [ 'jshint', 'copy', 'ngtemplates', 'less' ])

  # Optimize pre-built, web-accessible resources for production, primarily `usemin`
  grunt.registerTask('optimize', [ 'useminPrepare', 'concat', 'uglify', 'mincss', 'usemin' ])


  # Configuration
  grunt.config.init

    # Directory CONSTANTS (see what I did there?)
    BUILD_DIR:      './'
    CLIENT_DIR:     '_client/'
    COMPONENTS_DIR: '_components/'
    SERVER_DIR:     '_server/'

    # Glob CONSTANTS
    ALL_FILES:      '**/*'
    CSS_FILES:      '**/*.css'
    HTML_FILES:     '**/*.html'
    IMG_FILES:      '**/*.{png,gif,jpg,jpeg}'
    JS_FILES:       '**/*.js'
    LESS_FILES:     '**/*.less'


    copy:
      # App images from Bower `components` & `client`
      images:
        files:      [
          expand:   true,
          cwd:      '<%= COMPONENTS_DIR %>/bootstrap/img'
          src:      '<%= IMG_FILES %>'
          dest:     '<%= BUILD_DIR %>/img'
        ,
          expand:   true
          cwd:      '<%= CLIENT_DIR %>'
          src:      '<%= IMG_FILES %>'
          dest:     '<%= BUILD_DIR %>'
        ]

      # Copy `client` -> `build`, as resources are served from `build`
      client:
        files:      [
          expand:   true
          cwd:      '<%= CLIENT_DIR %>'
          src:      '<%= ALL_FILES %>'
          dest:     '<%= BUILD_DIR %>'
        ,
          src:      '<%= CLIENT_DIR %>/index.html'
          dest:     '<%= BUILD_DIR %>/404.html'
        ]

      # Make components HTTP-accessible
      components:
        files:
          '<%= BUILD_DIR %>': '<%= COMPONENTS_DIR + ALL_FILES %>'

      # app (non-Bower) JS in `client`
      js:
        files:      [
          expand:   true
          cwd:      '<%= CLIENT_DIR %>'
          src:      '<%= JS_FILES %>'
          dest:     '<%= BUILD_DIR %>'
        ]

      # app (non-Bower) HTML in `client`
      templates:
        files:      [
          expand:   true
          cwd:      '<%= CLIENT_DIR %>'
          src:      '<%= HTML_FILES %>'
          dest:     '<%= BUILD_DIR %>'
        ,
          src:      '<%= CLIENT_DIR %>/index.html'
          dest:     '<%= BUILD_DIR %>/404.html'
        ]

    # Validate app `client` and `server` JS
    jshint:
      files:        [ '<%= SERVER_DIR + JS_FILES %>'
                      '<%= CLIENT_DIR + JS_FILES %>' ]
      options:
        es5:        true
        laxcomma:   true  # Common in Express-derived libraries

    # Browser-based testing
    karma:
      options:
        configFile: 'karma.conf.js'

      # Used for running tests while the server is running
      background:
        background: true
        singleRun:  false

      # Used for testing site across several browser profiles
      browsers:
        browsers:   [ 'PhantomJS' ] # 'Chrome', 'ChromeCanary', 'Firefox', 'Opera', 'Safari', 'IE', '_bin/browsers.sh'
        background: true
        singleRun:  false

      # Used for one-time validation (e.g. `grunt test`, `npm test`)
      unit:
        singleRun:  true

    # Compile `app.less` -> `app.css`
    less:
      '<%= BUILD_DIR %>/app/styles/app.css': '<%= CLIENT_DIR %>/app/styles/app.less'

    # Support live-reloading of all non-Bower resources
    livereload:
      options:
        base:       '<%= BUILD_DIR %>'
      files:        '<%= BUILD_DIR + ALL_FILES %>'

    # Minify app `.css` resources -> `.min.css`
    mincss:
      app:          {}

    # Convert Angular `.html` templates to `.js` in the `app` module
    ngtemplates:
      app:
        src:        '<%= BUILD_DIR %>/app/<%= HTML_FILES %>'
        dest:       '<%= BUILD_DIR %>/app/scripts/app.templates.js'
        options:
          base:     '<%= BUILD_DIR %>'

    # Ability to run `jshint` without errors terminating the development server
    parallel:
      jshint:       [ grunt: true, args: [ 'jshint' ] ]

    # "watch" distinct types of files and re-prepare accordingly
    regarde:
      # Changes to app code should be validated and re-copied to the `build`, triggering `regarde:build`
      js:
        files:      '<%= CLIENT_DIR + JS_FILES %>'
        tasks:      [ 'copy:js', 'parallel:jshint' ]

      # Changes to app styles should re-compile, triggering `regarde:build`
      less:
        files:      '<%= CLIENT_DIR + LESS_FILES %>'
        tasks:      [ 'less' ]

      # Changes to server-side code should validate, restart the server, & refresh the browser
      server:
        files:      '<%= SERVER_DIR + ALL_FILES %>'
        tasks:      [ 'parallel:jshint', 'express-server', 'livereload' ]

      # Changes to app templates should re-copy & re-compile them, triggering `regarde:build`
      templates:
        files:      '<%= CLIENT_DIR + HTML_FILES %>'
        tasks:      [ 'copy:templates', 'ngtemplates' ]

    # Express requires `server.script` to reload from changes
    server:
      script:       '<%= SERVER_DIR %>/server.js'
      port:         process.env.PORT || 3000

    # Output for optimized app index
    usemin:
      html:         [ '<%= BUILD_DIR %>/index.html', '<%= BUILD_DIR %>/404.html' ]

    # Input for optimized app index
    useminPrepare:
      html:         [ '<%= BUILD_DIR %>/index.html' ]


  # Dependencies
  grunt.loadNpmTasks('grunt-angular-templates')
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
