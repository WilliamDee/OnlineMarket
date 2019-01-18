const jwt = require('jsonwebtoken');
const config = require('../configurations/config');

// Authentication route to get jwt token
exports.authRoutesConfig = function(app){
	app.post('/authenticate', function(req, res){
		const username = req.body.username;
		const password = req.body.password;

		// check if user exists
		if(username == 'testaccount'){
			// check if password is correct
			if(password == 'password123'){
				const payload = {
					check : true
				}
				var token = jwt.sign(payload, config.secret, {
					expiresIn: 60 // expiresin 1 hour
				});
				
				res.json({
					message: 'Authentication completed',
					token: token
				});
			} else {
				res.json({
					message: "Incorrect password"
				})
			}
		} else {
			res.json({
				message: "User not found"
			});
		}
	});
}
