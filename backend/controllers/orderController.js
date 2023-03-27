const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorhander');
const Order = require('../model/orderModel');
const Product = require('../model/productModel');

// Create new order
const newOrder = asyncHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        order,
    });
});

// Get All Order ---- admin
const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

// Get Single Order
const getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

// Get logged in user Orders
const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders,
    })
})

// Update Order Status ---- admin
const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity)
    })

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        })
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock = product.stock - quantity
    // product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
}

// Delete Order ---- admin
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    const deletedOrder = await Order.findByIdAndRemove(order)

    res.status(200).json({
        success: true,
    })
})

module.exports = { getAllOrders, getSingleOrder, newOrder, myOrders, updateOrder, deleteOrder };