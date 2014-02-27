
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/receive', function(request, response)
{
	response.end('Hello');
});

var j = {};
for (var i = 100 - 1; i >= 0; i--){
	app.get('/'+i, function(req,res){
		if (req.url.length > 3)
			j[req.url.split('=')[0].substr(3)] = 'defined!';
		res.end(''+req.url.split('=')[0].substr(3));
	});
};

var newpage = fileSystem.readFileSync("./newpage.html");

app.get('/newpage',function(req,res){
	fileSystem.readFile("./newpage.html",function(err,data){
		if (err) throw err;
		res.end(data);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
