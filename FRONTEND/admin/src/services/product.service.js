import createApiClient from './api.service';

class ProductService {
	constructor(baseUrl = '/api/products') {
		this.api = createApiClient(baseUrl);
	}

	async getAll() {
		return (await this.api.get('/')).data;
	}

	async getOne(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	// admin
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}

	// admin
	async create(data) {
		return (await this.api.post('/', data)).data;
	}

	// update
	async update(productId, data) {
		return (await this.api.post(`/${productId}/update`, data)).data;
	}

	async checkOrder(orderId) {
		return (await this.api.get(`/${orderId}/checkOrder`)).data;
	}
}

export default new ProductService();