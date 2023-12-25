import React, { useState } from 'react';
import './Quantity.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


export default function Quantity(props){
    const [quantity,setQuantity] = useState(props.quantity??1);


    const updateQuantity = (action)=>{
        if (action === 'increment'){
            setQuantity(quantity+1);
        } else{
            if(quantity > 1 ) setQuantity(quantity-1);
        }
    }
    return(
        <div className="product-quantity">
            <RemoveIcon className="quantity-btns" onClick ={()=>{updateQuantity('decrement')}}></RemoveIcon>
            {quantity}
            <AddIcon  className="quantity-btns" onClick ={()=>{updateQuantity('increment')}} ></AddIcon>
        </div>
    )
}