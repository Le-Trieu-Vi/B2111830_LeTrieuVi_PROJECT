const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// create and save a new order
exports.create = async (req, res, next) => {
    try {
		const orderService = new OrderService(MongoDB.client);
		let newOrder = req.body;
        
		newOrder.createAt = orderService.formatCurrentTime(0);
		newOrder.startDate = orderService.formatCurrentTime(5);
		newOrder.endDate = orderService.formatCurrentTime(15);

		// status
		newOrder.status = 'Chưa xử lí'

		const document = await orderService.create(newOrder);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
};

// update an order
exports.update= async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Không được để trống thông tin cập nhật."));
    }
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.id, req.body);
        // return res.send(document);
		return res.send({message: "Order was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the order")
        );
    }
};

// retrieve all orders form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const orderService = new OrderService(MongoDB.client);
        documents = await orderService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }

    return res.send(documents);
}

// find a single order with an id
exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Order not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving order with id=${req.params.id}`)
        );
    }
};

// delete an order with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Order not found"));
        }
        return res.send({message: "Order was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete order with id=${req.params.id}`)
        )
    };
};

// show orders of a user
exports.findOrdersByUser = async (req, res, next) => {
    let documents = [];
    try {
        const orderService = new OrderService(MongoDB.client);
        documents = await orderService.find({
			userId: req.params.id,
		});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }
    return res.send(documents);
}

// add a product into cart
exports.addCart = async (req, res, next) => {
    try {
		const orderId = req.params.id;
        const product = req.body;

        const orderService = new OrderService(MongoDB.client);
		let order = await orderService.findById(orderId);
		let cartItems = order.cartItems;

		// san pham da co trong gio hang
		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === product._id) {
				cur_product.productCount += 1;
				cartItems[idx] =  cur_product;
				order.cartItems = cartItems;
				await orderService.update(order._id, order);
				return res.send(order.cartItems);
			}
		}
		await orderService.update(order._id, order);
		await orderService.insertCart(orderId, product);

		return res.send(order.cartItems);
		// return res.send({message: "Adding product to cart successfully"});

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while adding product to cart")
        );
    }
};

// delete a product in an order's cart
exports.deleteProductFromCart = async (req, res, next) => {
    try {
		const { orderId, productId } = req.params;
        const orderService = new OrderService(MongoDB.client);

		let order = await orderService.findById(orderId);
		let cartItems = order.cartItems;
		order.cartItems = [];
		// so luong >= 1
		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === productId) {
				cur_product.productCount -= 1;
			}
			if (cur_product.productCount) order.cartItems.push(cur_product);
		}
		await orderService.update(orderId, order);
		let updatedOrder = await orderService.findById(orderId);
		return res.send(updatedOrder.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting product from cart")
        );
    }
};

// change product count in an order's cart
exports.changeProductCount = async (req, res, next) => {
    try {
		const { orderId, productId } = req.params;
		const count = req.body.count;
        const orderService = new OrderService(MongoDB.client);

		let order = await orderService.findById(orderId);
		let cartItems = order.cartItems;
		order.cartItems = [];
		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === productId) {
				cur_product.productCount = count;
			}
			if (cur_product.productCount) order.cartItems.push(cur_product);
		}
		await orderService.update(orderId, order);
		let updatedOrder = await orderService.findById(orderId);
		return res.send(updatedOrder.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while changing product count")
        );
    }
};

// delete all products in an order's cart
exports.makeEmptyCart = async (req, res, next) => {
    try {
		const orderId = req.params;

        const orderService = new OrderService(MongoDB.client);

		let order = await orderService.findById(orderId);
		order.cartItems = [];
		await orderService.update(orderId, order);
		let updatedOrder = await orderService.findById(orderId);
		return res.send(updatedOrder.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while delete all products in cart")
        );
    }
};