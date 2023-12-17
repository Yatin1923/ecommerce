import { useEffect } from "react";
import Transitions from "../../Components/Transition/Transition";
// import image from "public/assets/images/black-table.svg";
import Product_component from "../../Components/Product/Product.component";
import './Products.css';
import Reviews_component from "../../Components/Reviews/Reviews.component";
export default function Products(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
    return (
        <div className="container"> 
        <Transitions>
            <Product_component></Product_component>
            <Reviews_component></Reviews_component>
        </Transitions>
        </div>
    )
}