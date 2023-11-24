import UserService from '@/services/user.service'
import OrderService from '@/services/order.service'

export const user = (state, user) => {
	state.user = user;
}

export const setCartItems = async (state) => {
	const cartItems = await UserService.showCart(state.user._id);
	state.cartItems = cartItems;
}

export const setAllOrders = async (state) => {
	const allOrders = await OrderService.getByUser(state.user._id);
	state.allOrders = allOrders;
}

export const setProcessingOrderCount = (state) => {
	const orders = state.allOrders;
	let count = 0
	orders.forEach((item) => count += (item.status === 'Đang xử lí'));
	state.processingOrderCount = count;
}

export const setCompletedOrderCount = (state) => {
	const orders = state.allOrders;
	let count = 0
	orders.forEach((item) => count += (item.status === 'Hoàn thành'));
	state.completedOrderCount = count;
}

export const addToCart = async (state, product) => {
	const cartItems = await UserService.insertCart(state.user._id, product);
	state.cartItems = cartItems;
}

export const removeFromCart = async (state, product) => {
	const cartItems = await UserService.deleteCart(state.user._id, product._id);
	state.cartItems = cartItems;
}

export const removeProductCompletely = async (state, product) => {
	const cartItems = await UserService.changeProductCount(state.user._id, product._id, 0);
	state.cartItems = cartItems;
}

export const makeEmptyCart = async (state) => {
	const cartItems = await UserService.makeEmptyCart(state.user._id);
	state.cartItems = cartItems;
}

export const changeProductCount = async (state, {product, count}) => {
	const cartItems = await UserService.changeProductCount(state.user._id, product._id, count);
	state.cartItems = cartItems;
}
