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

module.exports = middleware;