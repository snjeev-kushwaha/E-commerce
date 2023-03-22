import React from 'react';
import profilePng from '../../images/Profile.png'
import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <Rating {...options} className='reviewCardComment' />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard;