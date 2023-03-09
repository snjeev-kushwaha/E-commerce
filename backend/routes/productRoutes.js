const express = require('express');

const productRoute = express.Router();
const {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProdcutReviews,
    deleteProductReviews
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

productRoute.route('/products').get(getAllProducts);

productRoute.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

productRoute.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

productRoute.route('/admin/product/:id').get(getProductDetails);

productRoute.route('/review').put(isAuthenticatedUser, createProductReview);

productRoute.route('/reviews').get(getProdcutReviews).delete(isAuthenticatedUser, deleteProductReviews);


module.exports = { productRoute };