const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

// CRUD orders
router.route("/")
    .post(orders.create)
	.get(orders.findAll)

router.route("/:id/update")
	.post(orders.update)

router.route("/:id")
    .get(orders.findOne)
    .delete(orders.delete);

router.route("/user/:id")
	.get(orders.findOrdersByUser)

router.route("/:id/cart")
	.post(orders.addCart)
	.delete(orders.makeEmptyCart)

router.route("/:orderId/cart/:productId")
	.delete(orders.deleteProductFromCart)
	.post(orders.changeProductCount)

module.exports = router;







