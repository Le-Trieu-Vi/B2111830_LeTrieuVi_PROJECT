const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const productsRouter = require("./app/routers/product.route");
const usersRouter = require("./app/routers/user.route");
const ordersRouter = require("./app/routers/order.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cookieParser());

app.use(cors({
	credentials: true,
	origin: ['http://localhost:8080', 'http://localhost:8081']
}));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

// handler 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Serve Error",
    });
});

module.exports = app;