/**
 * express-server
 */

'use strict';

var path    = require('path');
var server  = null; // Store server between live reloads to close/restart express

module.exports = function(grunt) {

  grunt.registerTask('express-server', 'Start an express web server', function() {
    // Close pre-existing server
    if (server) {
      try {
        server.close();
        console.log("Closed existing Express server");
      } catch (e) {}

      server = null;
    }

    // Clear require cache
    for (var key in require.cache) {
      if (require.cache[key]) {
        delete require.cache[key];
      }
    }

    process.env.PORT  = grunt.config.get('server.port');
    server            = require(grunt.config.get('server.script'));
  });

};
