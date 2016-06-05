module.exports = (grunt) ->

  cleanCommand = 'rm -rf <%= outputDir %>'
  buildCommand = 'oj <%= targetDir %> <%= options %> --output <%= outputDir %>'

  # Project configuration.
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    targetDir: 'website'
    modulesDir: 'website/modules'
    outputDir: 'www'
    options: '--no-modules'

    # Shell commands
    shell:

      # Use OJ to build the website
      buildWebsiteWithOJ:
        command: [
          "echo [#{buildCommand}]"
          buildCommand
        ].join('&&')
        options:
          stdout: true
          stderr: true

      # Clean the website
      cleanWebsite:
        command: [
          "echo [#{cleanCommand}]"
          cleanCommand
        ].join('&&')
        options:
          stdout: true
          stderr: true

    # Open commands
    open:
      # Open the website in a browser
      'index':
        path: './www/index.html'
        app:'Google Chrome'

      'use-template':
        path: './www/use-template.html'
        app:'Google Chrome'
  )

  # # Load the grunt modules
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-open'

  # # Default tasks
  grunt.registerTask 'default', ['build']

  # # Register tasks
  grunt.registerTask 'build', 'Build a Static Website with OJ', ['shell:buildWebsiteWithOJ']

  # # Register tasks
  grunt.registerTask 'clean', 'Clean Built Website Files', ['shell:cleanWebsite']