
# Module dependencies.
# -----------------------------------------------------------------------------

express = require 'express'
app = express()
oj = require 'oj'
http = require 'http'
path = require 'path'

# Configure Express
# ----------------------------------------------------------------------------

port = process.env.PORT || 3000
publicDir = path.join __dirname, '/public'
viewDir = path.join __dirname, '/views'
faviconPath = path.join __dirname, '/public/images/favicon.ico'
modulesDirSrc = path.join __dirname, '/modules'
modulesDirDest = path.join publicDir, '/modules'

app.set 'port', port
app.set 'views', viewDir

app.use express.logger('dev')
app.use express.compress()
app.use express.json()
app.use express.urlencoded()
app.use express.favicon(faviconPath)
app.use express.methodOverride()
app.use app.router

# Use OJ
# ----------------------------------------------------------------------------

# Register '.ojc' as default view extension and
# '.oj' and '.ojc as known extensions
app.set('view engine', 'ojc');
app.engine('oj', oj.__express)  # JavaScript
app.engine('ojc', oj.__express) # CoffeeScript

# Register express middleware to compile module files in /modules to /public/modules
app.use oj.middleware
  publicDir: publicDir
  modulesDirSrc: modulesDirSrc
  modulesDirDest: modulesDirDest
  minify: false

# Static host at /public
# ----------------------------------------------------------------------------

app.use express.static(publicDir)

# Error Reporting
# ----------------------------------------------------------------------------

# Report errors in development mode
if 'development' == app.get('env')
  app.use express.errorHandler()

# Fail if nothing handle the request
app.use (req,res,next) ->
  res.send(404)

# Routes
# ----------------------------------------------------------------------------

# Route /
app.get '/', (req, res) ->
  # Render view located at /views/index.oj
  res.render 'index', title: 'CoffeeScript Express Server with OJ'

# Route /use-template
app.get '/use-template', (req, res) ->
  # Render the view located at /views/template-example.oj
  res.render 'use-template', title: 'CoffeeScript Express Server with OJ and Template'

# Start Express
# ----------------------------------------------------------------------------

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"
