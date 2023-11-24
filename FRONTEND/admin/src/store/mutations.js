import OrderService from '@/services/order.service'

export const user = (state, user) => {
	state.user = user;
}

export const setNewOrderCount = async (state) => {
	const orders = await OrderService.getAll();
	let count = 0
	orders.forEach((item) => count += (item.status === 'Chưa xử lí'));
	state.newOrderCount = count;
}

