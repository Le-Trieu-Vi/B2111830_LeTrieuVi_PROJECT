export const user = (state) => {
	return state.user;
}

export const cartItems = (state) => {
	return state.cartItems;
}

export const allOrders = (state) => {
	return state.allOrders;
}

export const processingOrderCount = (state) => {
	return state.processingOrderCount;
}

export const completedOrderCount = (state) => {
	return state.completedOrderCount;
}

const formatPrice = (num) => {
	var p = num.toString().split(".");
	return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
		return num + (num != "-" && i && !(i % 3) ? "." : "") + acc;
	}, "") + ".000VND";
}

export const totalPrice = (state) => {
	let price = 0;
	state.cartItems.forEach(item => {
		price += Number(item.productDetail.price*item.productCount);
	})
	return formatPrice(price);
}


