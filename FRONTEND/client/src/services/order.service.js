import createApiClient from './api.service';

class OrderService {
	constructor(baseUrl = '/api/orders') {
		this.api = createApiClient(baseUrl);
	}

	async create(curUser, cartItems, notion) {
		const data = {
			userId: curUser._id,
			name: curUser.name,
			phone: curUser.phone,
			address: curUser.address,
			cartItems: cartItems,
			notion: notion,
		}
		return ((await this.api.post('/', data)).data);
	}

	async update(id, curOrder) {
		const data = {
			userId: curOrder.userId,
			name: curOrder.name,
			phone: curOrder.phone,
			address: curOrder.address,
			cartItems: curOrder.cartItems,
			notion: curOrder.notion,
		}
		return ((await this.api.post(`/${id}/update`, data)).data);
	}

	async getAll() {
		return (await this.api.get('/')).data;
	}

	async getOne(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	// them mot don vi
	async insertCart(orderId, product) {
		return (await this.api.post(`/${orderId}/cart`, product)).data;
	}

	// xoa mot don vi san pham
	async deleteCart(orderId, product_id) {
		return (await this.api.delete(`/${orderId}/cart/${product_id}`)).data;
	}

	// thay doi so luong khi nhap
	async changeProductCount(orderId, product_id, count) {
		const data =  {count : count};
		return (await this.api.post(`/${orderId}/cart/${product_id}`, data)).data;
	}

	// make empty cart
	async makeEmptyCart(orderId) {
		return (await this.api.delete(`/${orderId}/cart`)).data;
	}

	// xoa toan bo order
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}

	async getByUser(id) {
		return (await this.api.get(`/user/${id}`)).data;
	}

}

export default new OrderService();