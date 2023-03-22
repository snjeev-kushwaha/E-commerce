import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './productDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/ProductAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from '../../constants/ProductConstants';

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert();

    const { product, loading, error } = useSelector(state => state.productDetails)

    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
        console.log(qty, "qty")
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
        console.log(qty, "qty")
    }

    const submitReviewToggele = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        alert.success("Item Added To Cart");
    }

    const reviewSubmitHandler = (e) => {
        const myForm = new FormData();
        myForm.set('rating', rating)
        myForm.set('comment', comment)
        myForm.set('productId', id)

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors)
        }
        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch(({ type: NEW_REVIEW_RESET }))
        }
    })

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />) : (

                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {product.images && product.images.map((item, i) => (
                                    <img className='CarouselImage'
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options} />
                                <span className='.detailsBlockSpan'>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:{""}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggele}>Submit Review</button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggele}>
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                            <textarea className='submitDialogTextArea' cols="30" rows="5" vlaue={comment} onChange={(e) => setComment(e.target.value)}>

                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggele} className='secondary'>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} className='primary'>Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>{product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}</div>
                    ) : (
                        <p className='noReviews'>No Review Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails