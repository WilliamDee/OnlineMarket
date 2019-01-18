var router = require('express').Router();

var Cart = require('../models/cart');
var validation = require('../authentication/validation');

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


// Adds a product to the cart
router.get('/add_to_cart/:productId', function(req, res){
	const productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {}); // retrieves current cart if it exists, else initiate a new cart
	res.locals.connection.query(`SELECT * FROM product WHERE id=${productId}`, function(err, results, fields){
		if(err || results.length == 0){
			console.error(err ? err : 'Unable to retrieve product');
			res.sendStatus(500);
		} else {
			var productDetails = results[0];
			const maxProductInventory = productDetails.inventory_count;
			delete productDetails.id;
			delete productDetails.inventory_count;
			try{
				cart.add(productId, productDetails, maxProductInventory); // Adds the selected product to the cart	
				req.session.cart = cart; // Update current cart with the updated cart
				res.sendStatus(200);
			} catch (err){
				console.error(err);
				res.send('Not enough stock.');
			}
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

/* 
adds a new product entry to the database
post data should be in JSON format:
ex.
	{
		title : 'New Product',
		price : 10.14
		inventory_count : 12
	}
*/
router.post('/add_product', validation.validateJWT, function(req, res){ // JWT token required to make request
	const newProduct = req.body;

	res.locals.connection.query(`INSERT INTO product (title, price, inventory_count) VALUES ("${newProduct.title}", ${newProduct.price}, ${newProduct.inventory_count});`, function(err, results, fields){
		if(err){
			console.error(err);
			res.status(500);
		} else {
			console.log("Successfully inserted new product into table");
			res.status(200);
		}
		res.redirect('/'); // redirects back the homepage
	});
});

/*
increase inventory_count of a product
put data should be in JSON format:
ex.
	{
		title : 'Update Product',
		add_amount : 10
	}
*/
router.put('/add_product_inventory', validation.validateJWT, function(req, res){ // JWT token required to make request
	const productName = req.body.title;
	const add_amount = req.body.add_amount;

	res.locals.connection.query(`UPDATE product SET inventory_count=inventory_count+${add_amount} WHERE title="${productName}"`, function(err, results, fields){
		if(err){
			console.error(err);
			res.status(500);
		} else {
			console.log(`Successfully add ${add_amount} to "${productName}"`);
			res.status(200);
		}
		res.redirect('/');
	});
})

// submit the current cart
router.get('/submit_cart', function(req, res){
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	if(!cart){
		res.sendStatus(200);
	}

	// Update the inventory_count of each item that is in the cart
	for(id in cart.items){
		var item = cart.items[id];
		res.locals.connection.query(`UPDATE product SET inventory_count = inventory_count - ${item.quantity} WHERE id = ${id}`), function(err, results, fields){
			console.log('updated item inventory');
		}
	}

	req.session.cart = undefined;
	res.status(200).redirect('/');
})

module.exports = router;