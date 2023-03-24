const express = require('express');

const orderRoute = express.Router();

const { getAllOrders, getSingleOrder, newOrder, myOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

orderRoute.route('/admin/order').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

orderRoute.route('/order/new').post(isAuthenticatedUser, newOrder);

orderRoute.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

orderRoute.route('/order/me/my').get(isAuthenticatedUser, myOrders)

orderRoute.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

orderRoute.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = { orderRoute };