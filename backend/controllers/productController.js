const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const ErrorHandler = require('../utils/errorhander')
const ApiFeatures = require('../utils/apifeatures')

const getAllProducts = asyncHandler(async (req, res) => {
   const resultPerPage = 10;
   const productCount = await Product.countDocuments()

   const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()

   let products = await apiFeature.query;
   let filteredProductsCount = products.length;
   apiFeature.pagination(resultPerPage)

   // products = await apiFeature.query;

   res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      filteredProductsCount,
   })
})

// create product  ---- admin
const createProduct = asyncHandler(async (req, res, next) => {
   req.body.user = req.user.id;
   const product = await Product.create(req.body)

   res.status(201).json({
      success: true,
      product
   })
})

// Get single product
const getProductDetails = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) {
      return next(new ErrorHandler("Product not found", 404))
   }
   res.status(200).json({
      success: true,
      product,
   })
})

// update product ---- admin
const updateProduct = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) {
      return next(new ErrorHandler("Product not found", 404))
   }
   const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   })
   res.status(200).json({
      success: true,
      updatedProduct
   })
})

const deleteProduct = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.id)
   if (!product) {
      return next(new ErrorHandler("Product not found", 404))
   }
   const deletedProduct = await Product.findByIdAndDelete(product)
   res.status(200).json({
      success: true,
      message: "Product Delete successfully"
   })
})

// create new review and update the review
const createProductReview = asyncHandler(async (req, res, next) => {
   const { rating, comment, productId } = req.body;
   const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating),
   }
   const product = await Product.findById(productId)
   const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

   if (isReviewed) {
      product.reviews.forEach((rev) => {
         if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),
               (rev.comment = comment)
      })
   } else {
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length
   }
   let avg = 0;

   product.reviews.forEach((rev) => {
      // avg = avg+rev.rating
      avg += rev.rating
   })
   product.ratings = avg / product.reviews.length
   await product.save({ validateBeforeSave: false })
   res.status(200).json({
      success: true,
   })
})

/// Get All Reviews
const getProdcutReviews = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.query.id)

   if (!product) {
      return next(new ErrorHandler("Product not found", 404))
   }
   res.status(200).json({
      success: true,
      reviews: product.reviews,
   })
})

/// Delete Reviews
const deleteProductReviews = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.query.productId)
   if (!product) {
      return next(new ErrorHandler("Product not found", 404))
   }
   const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
   );
   let avg = 0;
   reviews.forEach((rev) => {
      avg += rev.rating
   })

   const ratings = avg / reviews.length;

   const numOfReviews = reviews.length;

   await Product.findByIdAndUpdate(
      req.query.productId,
      {
         reviews,
         ratings,
         numOfReviews
      },
      {
         new: true,
         // runValidators: true,
         useFindAndModify: false
      })

   res.status(200).json({
      success: true,
   })
})

module.exports = {
   getAllProducts,
   getProductDetails,
   createProduct,
   updateProduct,
   deleteProduct,
   createProductReview,
   getProdcutReviews,
   deleteProductReviews
}