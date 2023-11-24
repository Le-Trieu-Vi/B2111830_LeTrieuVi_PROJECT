import createApiClient from './api.service';

class UserService {
	constructor(baseUrl = '/api/users') {
		this.api = createApiClient(baseUrl);
	}

	async getAll() {
		return (await this.api.get('/')).data;
	}

	async getOne() {
		return (await this.api.get('/user')).data;
	}

	async showCart(userId) {
		return (await this.api.get(`/${userId}/cart`)).data;
	}

	async insertCart(userId, product) {
		return (await this.api.post(`/${userId}/cart`, product)).data;
	}

	async deleteCart(userId, product_id) {
		return (await this.api.delete(`/${userId}/cart/${product_id}`)).data;
	}

	async changeProductCount(userId, product_id, count) {
		const data =  {count : count};
		return (await this.api.post(`/${userId}/cart/${product_id}`, data)).data;
	}

	// make empty cart
	async makeEmptyCart(userId) {
		return (await this.api.delete(`/${userId}/cart`)).data;
	}

	// register
	async create(data) {
		return (await this.api.post('/register', data)).data;
	}

	// login
	async login(data) {
		return (await this.api.post('/login', data)).data;
	}

	// logout
	async logout() {
		return (await this.api.post('/logout')).data;
	}

	// update
	async update(userId, data) {
		return (await this.api.post(`/${userId}/update`, data)).data;
	}
}

export default new UserService();