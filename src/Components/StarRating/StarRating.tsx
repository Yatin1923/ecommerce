import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ value,onChange }) => {
  return (
    <Rating
      name="rating-icons"
      value={value}
      onChange={(event,newValue)=>onChange(newValue)}
      getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
      precision={0.1}
      readOnly = {value?true:false}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
  );
};

export default StarRating;
