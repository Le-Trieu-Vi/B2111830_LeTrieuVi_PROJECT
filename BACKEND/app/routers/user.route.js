const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

// CRUD user
router.route("/")
	.get(users.findAll)

router.route("/register")
	.post(users.create)

router.route("/:id/update")
	.post(users.update)

// client login
router.route("/login")
	.post(users.loginClientController)

// admin login
router.route("/admin/login")
	.post(users.loginAdminController)

// client logout
router.route("/logout")
	.post(users.logoutClientController)

// admin logout
router.route("/admin/logout")
	.post(users.logoutAdminController)

// client
router.route("/user")
	.get(users.findOne)

// admin
router.route("/admin/user")
	.get(users.findOneAdmin)

router.route("/:id")
	.get(users.findById)

router.route("/:id")
    .delete(users.delete);

// cart route
router.route("/:id/cart")
	.get(users.showCart)
	.post(users.addCart)
	.delete(users.makeEmptyCart)

router.route("/:userId/cart/:productId")
	.delete(users.deleteProductFromCart)
	.post(users.changeProductCount)

module.exports = router;







