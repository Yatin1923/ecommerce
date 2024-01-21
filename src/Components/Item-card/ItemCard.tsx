import './ItemCard.css';
import StarRating from "../StarRating/StarRating";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {addToCartAsync} from '../../Redux/reducers'
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';

export default function ItemCard(props:any){
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
     
      const dispatch = useDispatch<any>();
      const [loading,setLoading] = useState(false);
      const handleAddtoCart = async()=>{
        setLoading(true);
        await dispatch(addToCartAsync(props));
        setLoading(false);
      }
      
    return(
        <div className="item" >
        <div >
            <div className='img-div '>
            <Link to={{pathname:'/products'}} className="item-link">
                <img src={props.imageUrl}  alt='image test' />
            </Link>
                <div className='labels'>
                    <div className="label">
                        <span>{props.new?'NEW' : ''}</span>
                    </div>
                    <div className="label green">
                        <span>{props.discount? '-'+props.discount +'%':''}</span>
                    </div>
                </div>
                <IconButton aria-label="Favourite" className="favouriteBtn">
                    <FavoriteBorderOutlinedIcon/>
                </IconButton>
                <ThemeProvider theme={theme}>
                    <LoadingButton loading={loading} variant="contained" className="AddToCartBtn" onClick={handleAddtoCart}>Add to cart</LoadingButton>
                </ThemeProvider>
           
            </div>
            <Link to='/products' className="item-link">
           
            <div className="item-details">
                <StarRating value={props.rating}/>
                <strong>{props.name}</strong>
                <div>
                    <strong>{'$'+props.price}</strong><s className="oldprice"> {props.oldprice? '$'+props.oldprice:''}</s>
                </div>
            </div>
    </Link>
        </div>
    </div>

    )
}
