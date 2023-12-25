import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import './FlyOutCart.css';
import CartItem from '../Cart-Item/CartItem';


export default function FlyOutCart( props){
    const [open,setOpen] = React.useState(false);
    React.useEffect(()=>{
        setOpen(props.isDrawerOpen)
        console.log(props.isDrawerOpen)
    },[props])
    return (
        <Drawer  open={props.isOpen} anchor='right' onClose={props.toggleDrawer} >
            <div className='sn_container'>
                <h2>Cart</h2>
                <CartItem image ='assets/images/Table-img.png' name="Tray Table" color="black" quantity={2} price={19.19}></CartItem>             
                <CartItem image ='assets/images/Table-img.png' name="Tray Table" color="black" quantity={2} price={19.19}></CartItem>             
                <CartItem image ='assets/images/Table-img.png' name="Tray Table" color="black" quantity={2} price={19.19}></CartItem>             
            </div>
        </Drawer>
    )
}