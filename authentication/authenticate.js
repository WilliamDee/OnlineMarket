const jwt = require('jsonwebtoken');
const config = require('../configurations/config');

exports.authRoutesConfig = function(app){
	app.post('/authenticate', function(req, res){
		const username = req.body.username;
		const password = req.body.password;
		if(username == 'testaccount'){
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
					message: "Incorrent password"
				})
			}
		} else {
			res.json({
				message: "User not found"
			});
		}
	});
}
