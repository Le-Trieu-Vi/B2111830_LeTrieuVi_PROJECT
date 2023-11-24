const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload) {
        const product = {
            name: payload.name,
            price: payload.price,
            description: payload.description,
            imageUrl: payload.imageUrl,
			quantity: payload.quantity,
            averageRating: payload.averageRating,
        };
		if (!payload.averageRating) product.averageRating = 0;
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Product.insertOne(
            product
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

	async findOne(filter) {
        const cursor = await this.Product.findOne(filter);
        return cursor;
    }

    async findById(productId) {
		return await this.Product.findOne({
			_id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });
    }

	async update(id, payload) {
		const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(productId) {
        const result = await this.Product.findOneAndDelete({
			_id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });
        return result.value;
    }
}

module.exports = ProductService;