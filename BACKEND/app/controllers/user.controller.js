const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const adminsUsername=["admin"];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create and save a new user
exports.create = async (req, res, next) => {
    try {
		const userService = new UserService(MongoDB.client);
		let newUser = req.body;
		// check if username existed
		const allUsers = await userService.find({});
		for (let key in allUsers) {
			let user = allUsers[key];
			if (user.username === newUser.username) {
				return next(new ApiError(400, "Username existed!"));
			}
		}
		// hash password
		newUser.passwordLength = newUser.password.length;
		const hashedPassword = await bcrypt.hash(newUser.password, 10);
		newUser.password = hashedPassword;
		newUser.confirmPassword = hashedPassword;
		// role
		if (adminsUsername.includes(newUser.username)) {
			newUser.role = '1';
		} else {
			newUser.role = '0';
		}
		// date
		const today = new Date();
		const yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		const formattedToday = dd + '/' + mm + '/' + yyyy;
		newUser.registerDate = formattedToday;

		const document = await userService.create(newUser);

        // return res.send(document);
		return res.send({message: "User was created successfully"});
    } catch (error) {
		console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the user")

        );
    }
};

// update a user
exports.update = async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Không được để trống thông tin cập nhật."));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        // return res.send(document);
		return res.send({message: "User was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the user")
        );
    }
};

// retrieve all users form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        documents = await userService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving users")
        );
    }

    return res.send(documents);
}

// find a single user with an id
exports.findById = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
};

// get client User with cookie
exports.findOne = async (req, res, next) => {
    try {
		const cookie = req.cookies['jwt'];
		const claims = jwt.verify(cookie, 'callmebyyourname');
		if (!claims) {
			return next(
				new ApiError(401, `Invalid credentials`)
			);
		}
		else {
			const userService = new UserService(MongoDB.client);
			const document = await userService.findById(claims._id);
			return res.send(document);
		}
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id`)
        );
    }
};

// get admin User with cookie
exports.findOneAdmin = async (req, res, next) => {
    try {
		const cookie = req.cookies['jwtAdmin'];
		const claims = jwt.verify(cookie, 'romeoandjuliet');
		if (!claims) {
			return next(
				new ApiError(401, `Invalid credentials`)
			);
		}
		else {
			const userService = new UserService(MongoDB.client);
			const document = await userService.findById(claims._id);
			return res.send(document);
		}
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id`)
        );
    }
};

// delete a user with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({message: "User was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete user with id=${req.params.id}`)
        )
    };
};

// show cart of a user
exports.showCart = async (req, res, next) => {
	const userService = new UserService(MongoDB.client);
	const user = await userService.findById(req.params.id);
	if (!user) {
		return next(new ApiError(404, "User not found"));
	}
	return res.send(user.cartItems);
}

// add a product into cart
exports.addCart = async (req, res, next) => {
    try {
		const userId = req.params.id;
        const product = req.body;

        const userService = new UserService(MongoDB.client);
		let user = await userService.findById(userId);
		let cartItems = user.cartItems;

		// san pham da co trong gio hang
		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === product._id) {
				cur_product.productCount += 1;
				cartItems[idx] =  cur_product;
				user.cartItems = cartItems;
				await userService.update(user._id, user);
				return res.send(user.cartItems);
			}
		}

		await userService.insertCart(userId, product);

		return res.send(user.cartItems);
		// return res.send({message: "Adding product to cart successfully"});

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while adding product to cart")
        );
    }
};

// delete a product in a user's cart
exports.deleteProductFromCart = async (req, res, next) => {
    try {
		const { userId, productId } = req.params;

        const userService = new UserService(MongoDB.client);

		let user = await userService.findById(userId);
		let cartItems = user.cartItems;
		user.cartItems = [];

		// so luong >= 1
		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === productId) {
				cur_product.productCount -= 1;
			}
			if (cur_product.productCount) user.cartItems.push(cur_product);
		}
		await userService.update(userId, user);
		let updatedUser = await userService.findById(userId);
		return res.send(updatedUser.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting product from cart")
        );
    }
};

// change product count in a user's cart
exports.changeProductCount = async (req, res, next) => {
    try {
		const { userId, productId } = req.params;
		const count = req.body.count;

        const userService = new UserService(MongoDB.client);

		let user = await userService.findById(userId);
		let cartItems = user.cartItems;
		user.cartItems = [];

		for (let idx in cartItems) {
			const cur_product = cartItems[idx];
			if (cur_product.productDetail._id === productId) {
				cur_product.productCount = count;
			}
			if (cur_product.productCount) user.cartItems.push(cur_product);
		}
		await userService.update(userId, user);
		let updatedUser = await userService.findById(userId);
		return res.send(updatedUser.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while changing product count")
        );
    }
};

// delete all products in a user's cart
exports.makeEmptyCart = async (req, res, next) => {
    try {
		const userId = req.params;

        const userService = new UserService(MongoDB.client);

		let user = await userService.findById(userId);
		user.cartItems = [];
		await userService.update(userId, user);
		let updatedUser = await userService.findById(userId);
		return res.send(updatedUser.cartItems);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while delete all products in cart")
        );
    }
};

// login client
exports.loginClientController = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findOne({
			username: req.body.username,
		});
		if (!document) {
			return next(new ApiError(404, "User not found"));
		}
		// login thanh cong
		if (await bcrypt.compare(req.body.password, document.password)) {
			// jwt
			const token = jwt.sign({_id: document._id}, 'callmebyyourname');
			res.cookie('jwt', token, {
				httpOnly: true,
				maxAge: 24*60*60*1000 // 1 day
			})
			// return res.send(document);
			res.send({
				message: 'Login successfully!'
			})
		}
		return next(new ApiError(404, "Nhap sai mat khau"));
    } catch (error) {
        return next(
            new ApiError(500, 'Loi 500')
        )
    }
};

// login admin
exports.loginAdminController = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findOne({
			username: req.body.username,
		});
		if (!document) {
			return next(new ApiError(404, "User not found"));
		}
		// login thanh cong
		if (await bcrypt.compare(req.body.password, document.password)) {
			// jwt
			const token = jwt.sign({_id: document._id}, 'romeoandjuliet');
			res.cookie('jwtAdmin', token, {
				httpOnly: true,
				maxAge: 24*60*60*1000 // 1 day
			})
			// return res.send(document);
			res.send({
				message: 'Login successfully!'
			})
		}
		return next(new ApiError(404, "Nhap sai mat khau"));
    } catch (error) {
        return next(
            new ApiError(500, 'Loi 500')
        )
    }
};

// log out client
exports.logoutClientController = async (req, res, next) => {
	res.cookie('jwt', '', {maxAge: 0});
	res.send({
		message: 'Logout successfully!'
	})
}

// log out admin
exports.logoutAdminController = async (req, res, next) => {
	res.cookie('jwtAdmin', '', {maxAge: 0});
	res.send({
		message: 'Logout successfully!'
	})
}