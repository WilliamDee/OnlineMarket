module.exports = function Cart(cart){
	this.items = cart.items || {};

	this.add = function(id, product){
		var cartItem = this.items.id;
		if(!cartItem){
			product[quantity] = 1;
			this.items[id] = product;
		} else {
			cartItem.quantity++
		}
	}

	this.remove = function(id){
		var cartItem = this.items.id;
		if(cartItem){
			cartItem.quantity--;
			if(cartItem.quantity <= 0){
				delete this.items.id
			}
		}
	}
}