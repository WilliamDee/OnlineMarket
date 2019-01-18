const jwt = require('jsonwebtoken');
const config = require('../configurations/config');

function validateJWT(req, res, next){
	var token = req.headers['access-token'];

	if(token){

		jwt.verify(token, config.secret, function(err, decoded){
			if(err){
				return res.json({
					message: "invalid token"
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({
			message: "no token provided"
		})
	}
}

module.exports = {
	validateJWT : validateJWT
}