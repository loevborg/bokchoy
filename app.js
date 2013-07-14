"use strict";

/**
 * Module dependencies.
 */

var express = require('express')
  , engine = require('ejs-locals')
  , routes = require('./routes')
  , recipes = require('./routes/recipes')
  , http = require('http')
  , path = require('path')
  , db = require('./db');

var app = express();

app.engine('ejs', engine);

require('express-helpers')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/recipes', recipes.list);
app.get('/recipes/:id', recipes.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
