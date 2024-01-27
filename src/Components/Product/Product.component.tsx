import {  useEffect, useState } from "react";
import './Product.component.css';
import StarRating from "../StarRating/StarRating";
import { Divider } from '@mui/material';
import Countdown from "react-countdown";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {addToCartAsync} from '../../Redux/reducers'
import { LoadingButton } from '@mui/lab';

export default function Product_component(props){
    const [quantity,setQuantity] = useState(1);
    const [countdownDate] = useState(Date.now() + Math.random() * 1000000000);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        console.log('PRoduct props',props)
    })
    const dispatch = useDispatch<any>();
    const handleAddtoCart = async()=>{
        setLoading(true);
        await dispatch(addToCartAsync(props.props));
        setLoading(false);
      }

    const updateQuantity = (action)=>{
        if (action === 'increment'){
            setQuantity(quantity+1);
        } else{
            if(quantity > 1 ) setQuantity(quantity-1);
        }
    }
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
    const renderer = ({ days,hours, minutes, seconds, completed }) => {
          return    <div className="countdown-timer">
                        <div className="counter-unit">
                            <span className="counter">{days < 10 ? `0${days}`:days } </span>
                            Days
                        </div>
                        <div className="counter-unit">
                            <span className="counter">{hours < 10 ? `0${hours}`:hours } </span>
                            Hours
                        </div>
                        <div className="counter-unit">
                            <span className="counter">{minutes < 10 ? `0${minutes}`:minutes } </span>
                            Minutes
                        </div>
                        <div className="counter-unit">
                            <span className="counter">{seconds < 10 ? `0${seconds}`:seconds } </span>
                            Seconds
                        </div>
                       
                    </div>
      };
    return (
        <div className="container"> 
            <div className="product-details">
                <div className="product-images">
                        <img className="main-image" src={props.props?.imageUrl}></img>
                    <div className="placeHolders">
                        <img className="" src='assets/images/Table-placeholder-1.png'></img>
                        <img className="" src='assets/images/Table-placeholder-2.png'></img>
                        <img className="" src='assets/images/Table-placeholder-3.png'></img>
                    </div>
                </div>
                <div className="product-content">
                    <StarRating value={props.props?.rating} onChange={undefined}></StarRating> 11 reviews
                    <h1>{props.props?.name}</h1>
                    <p>Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.</p>
                    <div className="product-price">
                        <h3>${props.props?.price}</h3> <s>{props.props?.oldprice?'$'+props.props?.oldprice:''}</s>
                    </div>
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <p className="text-color">Offer expires in</p>
                    <Countdown className="time-counter"  date={countdownDate} renderer={renderer} />
                    <br></br>
                    <Divider className="divider"></Divider>
                    <br></br>
                    <div className="action-buttons">
                        <div className="bottom-buttons">
                            <div className="product-quantity">
                                <RemoveIcon className="quantity-btns" onClick ={()=>{updateQuantity('decrement')}}></RemoveIcon>
                                {quantity}
                                <AddIcon  className="quantity-btns" onClick ={()=>{updateQuantity('increment')}} ></AddIcon>
                            </div>
                            <div className="add-to-wishlist">
                                <ThemeProvider theme={theme}>
                                    <Button variant="outlined" className="wishlist-button" ><FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon><Typography> Wishlist</Typography></Button>
                                </ThemeProvider>
                            </div>
                        </div>
                        <ThemeProvider theme={theme}>
                            <LoadingButton loading={loading} onClick={handleAddtoCart} variant="contained" className="cart-button" ><Typography>Add to cart</Typography></LoadingButton>
                        </ThemeProvider>
                    </div>                    
                </div>
            </div>
        </div>
    )
}