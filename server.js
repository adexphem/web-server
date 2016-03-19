var express = require('express');
var app = express();
var APP_PORT = 3000;
var currentDate = new Date().toString();

var middleware = {
	requireAuthentication: function(req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function(req, res, next) {
		console.log('Request ' + req.method + ' ' + req.originalUrl + ' made on ' + currentDate);
		next();
	}
};


app.use(middleware.logger);
//app.use(middleware.requireAuthentication);

app.get('/about', middleware.logger, function(req, res) {
	res.send('About Us!');
})

app.use(express.static(__dirname + '/public'));

app.listen(APP_PORT, function() {
	console.log('Express Server Started on '+ APP_PORT);
});