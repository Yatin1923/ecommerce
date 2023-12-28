import { useEffect, useState } from "react";
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

export default function Product_component(){
    
    const [quantity,setQuantity] = useState(1);
    const [countdownDate] = useState(Date.now() + Math.random() * 1000000000);


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
                        <img className="main-image" src='assets/images/Table-img.png'></img>
                    <div className="placeHolders">
                        <img className="" src='assets/images/Table-placeholder-1.png'></img>
                        <img className="" src='assets/images/Table-placeholder-2.png'></img>
                        <img className="" src='assets/images/Table-placeholder-3.png'></img>
                    </div>
                </div>
                <div className="product-content">
                    <StarRating value={4}></StarRating> 11 reviews
                    <h1>Tray Table</h1>
                    <p>Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.</p>
                    <div className="product-price">
                        <h3>$199.99</h3> <s>$499.99</s>
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
                            <Button variant="contained" className="cart-button" ><Typography>Add to cart</Typography></Button>
                        </ThemeProvider>
                    </div>                    
                </div>
            </div>
        </div>
    )
}