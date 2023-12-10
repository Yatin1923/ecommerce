import { useEffect } from "react";
import Transitions from "../../Components/Transition/Transition";
import './Products.css';
export default function Products(){
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <div className="container"> 
        <Transitions>
            <div className="product-details">
                <div className="product-image">
                    <img src="src/assets/images/Table-img.png"></img>
                </div>
                <h1>Tray Table</h1>
            </div>
        </Transitions>
        </div>
    )
}