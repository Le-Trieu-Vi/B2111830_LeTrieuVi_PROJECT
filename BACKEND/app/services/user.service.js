const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const user = {
			image: payload.image,
			name: payload.name,
            username: payload.username,
            email: payload.email,
            password: payload.password,
			confirmPassword: payload.confirmPassword,
			passwordLength: payload.passwordLength,
			address: payload.address,
			gender: payload.gender,
			phone: payload.phone,
			role: payload.role,
			registerDate: payload.registerDate,
			birthDate: payload.birthDate,
			cartItems: payload.cartItems,
			orders: payload.orders
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        let user = this.extractUserData(payload);
		if (!user.cartItems) user.cartItems = [];
        const result = await this.User.insertOne(
            user
        );
        return result.value;
    }

	async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

	async findOne(filter) {
        const cursor = await this.User.findOne(filter);
        return cursor;
    }

    async findById(userId) {
        return await this.User.findOne({
			_id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
        });
    }

	async update(id, payload) {
		const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

	async insertCart(userId, product) {
		const filter = {
			_id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
        };

        const result = await this.User.updateOne(
            filter, {
			$addToSet: { cartItems: {productDetail: product, productCount: 1}}
		});
        return result.value;
    }

    async delete(userId) {
        const result = await this.User.findOneAndDelete({
			_id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
        });
        return result.value;
    }
}

module.exports = UserService;