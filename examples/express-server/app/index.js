
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var oj = require('oj');

// Configure Express
// ----------------------------------------------------------------------------

var port = process.env.PORT || 3000;
var publicDir = path.join(__dirname, '/public');
var viewDir = path.join(__dirname, '/views');
var faviconPath = path.join(__dirname, '/public/images/favicon.ico');
var modulesDirSrc = path.join(__dirname, '/modules')
var modulesDirDest = path.join(publicDir, '/modules')

app.set('port', port);
app.set('views', viewDir);

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.favicon(faviconPath));
app.use(express.methodOverride());
app.use(app.router);

// Use OJ
// ----------------------------------------------------------------------------

// Register '.oj' as default view extension and
// '.oj' and '.ojc as known extensions
app.set('view engine', 'oj');
app.engine('oj', oj.__express)  // JavaScript
app.engine('ojc', oj.__express) // CoffeeScript

// Register express middleware to compile module files in /modules to /public/modules
app.use(oj.middleware({
  publicDir: publicDir,
  modulesDirSrc: modulesDirSrc,
  modulesDirDest: modulesDirDest,
  minify: false
}));

// Static host at /public
// ----------------------------------------------------------------------------

app.use(express.static(publicDir));

// Error Reporting
// ----------------------------------------------------------------------------

// Report errors in development mode
if ('development' == app.get('env'))
  app.use(express.errorHandler());

// Fail if nothing handle the request
app.use(function(req,res,next){
  res.send(404);
});

// Routes
// ----------------------------------------------------------------------------

// Route /
app.get('/', function(req, res){
  // Render view located at /views/index.oj
  res.render('index', {title: 'Express Server with OJ'});
});

// Route /use-template
app.get('/use-template', function(req, res){
  // Render the view located at /views/template-example.oj
  res.render('use-template', {title: 'Template with Express and OJ' });
});

// Start Express
// ----------------------------------------------------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
