import { useEffect } from "react";
import Transitions from "../../Components/Transition/Transition";
import Product_component from "../../Components/Product/Product.component";
import './Products.css';
import Reviews_component from "../../Components/Reviews/Reviews.component";
import React from "react";
import { useLocation } from "react-router-dom";
export default function Products(){
    const location = useLocation();
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
        console.log(location.state);
    },[]);
    return (
        <div className="container"> 
        <Transitions>
            <div className="product-info">
                <Product_component props = {location.state}></Product_component>
            </div>
            <div className="product-review">
                <Reviews_component props={location.state}></Reviews_component>
            </div>
        </Transitions>
        </div>
    )
}