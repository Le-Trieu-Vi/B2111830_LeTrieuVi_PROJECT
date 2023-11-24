import createApiClient from './api.service';

class UserService {
	constructor(baseUrl = '/api/users') {
		this.api = createApiClient(baseUrl);
	}

	async getAll() {
		return (await this.api.get('/')).data;
	}

	async getOneAdmin() {
		return (await this.api.get('/admin/user')).data;
	}

	async findById(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	async showCart(userId) {
		return (await this.api.get(`/${userId}/cart`)).data;
	}

	// login
	async login(data) {
		return (await this.api.post('/admin/login', data)).data;
	}

	// logout
	async logout() {
		return (await this.api.post('/admin/logout')).data;
	}

	// update
	async update(userId, data) {
		return (await this.api.post(`/${userId}/update`, data)).data;
	}

	// delete
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}
}

export default new UserService();