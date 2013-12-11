
var express, app, server, fs, path, request, cheerio;

var port = 3002,
	ip = 0;

express = require('express');
app = express();
fs = require('fs');
path = require('path');
request = require('request');
cheerio = require("cheerio");

// Configuration
app.configure(function(){

	app.use(express.urlencoded());
	app.use(express.json());

	app.use(express.cookieParser()); // Cookies

	app.use(express.logger({ format: ' :req[ip] :date (:response-time ms): :method :url' })); // Logging
	app.use(express["static"]('./static')); // Static files
});

// Routing
fs.readdirSync('./routes').forEach(function(file) {

	var name = file.substr(0, file.indexOf('.'));
	
	require('./routes/' + name)({
		app: app,
		request: request,
		cheerio: cheerio
	});

	console.log('\n - Loaded: ' + name + '.js');
});

// Renders main
app.get('/', function(req, res) {

	res.render('index');
});

// Set server
server = app.listen(port, ip);
console.log(' - HTTP server started on port: ' + port + ', ip: ' + ip + '\n');