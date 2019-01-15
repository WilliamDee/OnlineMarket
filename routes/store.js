var router = require('express').Router();

router.get('/', function(req, res){
	res.send('Dashboard')
})

module.exports = router;