var express = require('express');
var app = express();
var APP_PORT = process.env.PORT || 3000;

var middleware = require('./middleware.js');


app.use(middleware.logger);
//app.use(middleware.requireAuthentication);

app.get('/about', middleware.logger, function(req, res) {
	res.send('About Us!');
})

app.use(express.static(__dirname + '/public'));

app.listen(APP_PORT, function() {
	console.log('Express Server Started on '+ APP_PORT);
});