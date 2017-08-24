const CartService = {
	ToggleVisibility: 				"ToggleVisibility",
	AddProduct: 					"AddProduct",
	
	callbacks : 					{},

	registerCart(cart) {
		this.cart = cart
	},
	registerCallback(event, callback) {
		this.callbacks[event] = callback
	},
	call(event, ...params) {
		if (typeof(this.callbacks[event]) !== "undefined") {
			this.callbacks[event](...params)
		}
	}
}

export default CartService;