import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  return (
    <Link className='productCard' to={product._id}>
      
    </Link>
  )
}

export default Product