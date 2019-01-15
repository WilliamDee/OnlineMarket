var router = require('express').Router();

var Cart = require('../models/cart');

// Store homepage, retrieves all products from database
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


// Adds a product with the given productId to the cart
router.get('/add_to_cart/:productId', function(req, res){
	const productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {}); // retrieves current cart if it exists, else initiate a new cart
	res.locals.connection.query(`SELECT * FROM product WHERE id=${productId}`, function(err, results, fields){
		if(err || results.length == 0){
			console.error(err ? err : 'Unable to retrieve product');
			res.sendStatus(500);
		} else {
			var productDetails = results[0];
			delete productDetails.id;
			delete productDetails.inventory_count;
			cart.add(productId, productDetails); // Adds the selected product to the cart
			req.session.cart = cart; // Update current cart with the updated cart
			res.sendStatus(200);
		}
	})
});

// Removes the selected product from the cart 
router.get('/remove_from_cart/:productId', function(req, res){
	const productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {}); // retrieves current cart if it exists, else initiate a new cart
	cart.remove(productId); // removes the selected product to the cart
	req.session.cart = cart; // Update current cart with the updated cart
	res.sendStatus(200);
});

// retrieves current cart details
router.get('/get_cart', function(req, res){
	var cart = new Cart(req.session.cart? req.session.cart : {}) // retrieves current cart if it exists, else initiate a new cart
	res.send(cart);
});

// adds a new product entry to the database
router.post('/add_product', function(req, res){
	var newProduct = req.body;

	res.locals.connection.query(`INSERT INTO product (title, price, inventory_count) VALUES ("${newProduct.title}", ${newProduct.price}, ${newProduct.inventory_count});`, function(err, results, fields){
		if(err){
			console.error(err);
			res.status(500);
		} else {
			console.log("Successfully inserted new product into table");
			res.status(200);
		}
		res.redirect('/'); // redirects back the homepage
	})
});


module.exports = router;