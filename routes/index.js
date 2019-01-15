var router = require('express').Router();

var Cart = require('../models/cart')

router.get('/', function(req, res){
	res.locals.connection.query('SELECT * FROM product', function(err, results, fields){
		if(err){
			console.error(err);
			res.sendStatus(500);
		} else {
			res.status(200).send(results);
		}
	})
});

router.get('/addToCart/:productId', function(req, res){
	const productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	res.locals.connection.query(`SELECT * FROM product WHERE id=${productId}`, function(err, results, fields){
		if(err || results.length == 0){
			console.error(err ? err : 'Unable to retrieve product');
			res.status(500).send(err ? err : 'Unable to retrieve product');
		} else {
			var productDetails = results[0];
			delete productDetails.id;
			delete productDetails.inventory_count;
			cart.add(productId, productDetails);
		}
	})

	res.redirect('/');
});

router.get('removeFromCart/:productId', function(req, res){
	const productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.remove(productId)

	res.redirect('/');
})
router.get('/cart', function(req, res){
	res.status(200).send('at the cart');
});

module.exports = router;