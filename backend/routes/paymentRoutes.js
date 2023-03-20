const express = require('express');

const paymentRoute = express.Router();
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middleware/auth')

paymentRoute.route('/payment/process').post(isAuthenticatedUser, processPayment);

paymentRoute.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

module.exports = { paymentRoute };
