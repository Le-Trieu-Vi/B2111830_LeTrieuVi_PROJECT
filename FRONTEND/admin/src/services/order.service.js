import createApiClient from './api.service';

class OrderService {
	constructor(baseUrl = '/api/orders') {
		this.api = createApiClient(baseUrl);
	}

	async create(curUser, cartItems, totalPrice, notion) {
		const data = {
			userId: curUser._id,
			name: curUser.name,
			phone: curUser.phone,
			address: curUser.address,
			cartItems: cartItems,
			totalPrice: totalPrice,
			notion: notion,
		}
		return ((await this.api.post('/', data)).data);
	}

	async update(id, data) {
		return (await this.api.post(`/${id}/update`, data)).data;
	}

	async getAll() {
		return (await this.api.get('/')).data;
	}

	async getOne(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}

	async getByUser(id) {
		return (await this.api.get(`/user/${id}`)).data;
	}

}

export default new OrderService();