const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const productRouter = require("./app/routers/product.route");
const customerRouter = require("./app/routers/user.route");
const orderRouter = require("./app/routers/order.route")
const ApiError = require("./app/api-error")
const app = express();

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080', 'http://localhost:8081']
}));

app.use(express.json());

app.use("/product", productRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);

// handler 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"))
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;