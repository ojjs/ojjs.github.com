module.exports = (grunt) ->

  startServerCommand = 'node <%= appDir %>'
  cleanCommand = 'rm -rf <%= modulesDirDest %>'

  # Project configuration.
  grunt.initConfig(
    pkg: grunt.file.readJSON 'package.json'
    port: '3000'
    host: 'localhost:<%= port %>'
    appDir: 'app'
    publicDir: '<%= appDir %>/public'
    modulesDirSrc: '<%= appDir %>/modules'
    modulesDirDest: '<%= publicDir %>/modules'

    # Shell commands
    shell:

      # Clean the website
      cleanWebsite:
        command: [
            'echo [' + cleanCommand + ']'
            cleanCommand
          ].join('&&')
        options:
          stdout: true
          stderr: true

      # Start server
      startServer:
        command: [
            'echo [' + startServerCommand + ']'
            startServerCommand
          ].join('&&')
        options:
            stdout: true
            stderr: true

    open:
      # Open the website in a browser
      'index':
        path: 'http://<%= host %>'
        app:'Google Chrome'

      'use-template':
        path: 'http://<%= host %>/use-template'
        app:'Google Chrome'
  )

  # Load the grunt modules
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-open'

  # Default tasks
  grunt.registerTask 'default', ['start']

  # Register tasks
  grunt.registerTask 'start', 'Start OJ Express Server', ['shell:startServer']

  # Register tasks
  grunt.registerTask 'clean', 'Clean Built Website Files', ['shell:cleanWebsite']
