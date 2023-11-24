const express = require("express");
const products = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAll)
    .post(products.create)

router.route("/:id/update")
	.post(products.update)

router.route("/:id/checkOrder")
	.get(products.checkOrder)

router.route("/:id")
    .get(products.findOne)
    .delete(products.delete);

module.exports = router;







