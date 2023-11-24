const ProductService = require("../services/product.service");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// create and save a new product
exports.create = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        // return res.send(document);
		return res.send({message: "Product was created successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

// update a product
exports.update = async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Không được để trống thông tin cập nhật."));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        // return res.send(document);
		return res.send({message: "Product was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the product")
        );
    }
};

// giam so luong khi xu li don hang
exports.checkOrder =  async (req, res, next) => {
	try {
		const orderService = new OrderService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);
		const order = await orderService.findById(req.params.id);
		const cartItems = order.cartItems;
		for (let idx in cartItems) {
			let product = cartItems[idx];
			product.productDetail.quantity -= product.count;
			await productService.update(product.productDetail._id, product.productDetail);
		}
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }
}

// retrieve all products of a user form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        documents = await productService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }
    return res.send(documents);
}

// find a single product with an id
exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with id=${req.params.id}`)
        );
    }
};

// delete a product with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.params.id}`)
        )
    };
};
