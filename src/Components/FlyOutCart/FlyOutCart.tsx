import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import './FlyOutCart.css';
import CartItem from '../Cart-Item/CartItem';
import { useSelector} from 'react-redux'

export default function FlyOutCart( props){
    let cartItems = useSelector((state:any)=>state.cart);
   
    React.useEffect(()=>{
        console.log(cartItems);
    },[props])
    return (
        <Drawer  open={props.isOpen} anchor='right' onClose={props.toggleDrawer} >
            <div className='sn_container'>
                <h2>Cart</h2>
                {cartItems.map(item=><CartItem image ={item.image} name={item.name} key={item.name} color="black" quantity={item.quantity??1} price={item.price}></CartItem>)}
            </div>
        </Drawer>
    )
}