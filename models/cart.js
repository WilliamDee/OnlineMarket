module.exports = function Cart(cart){
	this.items = cart.items || {};
	this.totalPrice = cart.totalPrice || '0';

	// adding an item to the cart
	this.add = function(id, product){
		var cartItem = this.items[id];
		// Increment cart details. If item doesn't exist in cart, add new entry
		if(!cartItem){ 
			product['quantity'] = 1;
			product['itemPriceTotal'] = product.price;
			this.items[id] = product;
		} else {
			cartItem.quantity++
			cartItem.itemPriceTotal = cartItem.price * cartItem.quantity;
		}
		this.totalPrice = ((+this.totalPrice) + product.price).toFixed(2); // Rounds total price to 2 decimal places
	}

	// removing an item from the cart
	this.remove = function(id){
		var cartItem = this.items[id];
		// Only remove from the cart if the given product_id exists in the cart
		if(cartItem){
			cartItem.quantity--;
			cartItem.itemPriceTotal -= cartItem.price;
			this.totalPrice = ((+this.totalPrice) - cartItem.price).toFixed(2) // Rounds total price to 2 decimal places
			if(cartItem.quantity <= 0){
				delete this.items[id];
			}
		}
	}
}