import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import './FlyOutCart.css';
import CartItem from '../Cart-Item/CartItem';
import { useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';
import { Button, createTheme,ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FlyOutCart(props) {
    let cartItems = useSelector((state: any) => state.cart);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
      const navigate = useNavigate();
      const handleViewCart = ()=>{
        props.toggleDrawer();
          navigate('cart');
      }

    return (
        <Drawer open={props.isOpen} anchor='right' className='cart-drawer' onClose={props.toggleDrawer} >
            <div className='sn_container'>
                <h2>Cart</h2>
                {cartItems.length > 0 ? 
                cartItems.map(item => 
                    <CartItem id={item.id} image={item.imageUrl} name={item.name} key={item.name} color="black" quantity={item.quantity ?? 1} price={item.price}></CartItem>) 
                    :
                    <h4>Cart is Empty</h4>}
                     <ThemeProvider theme={theme}>
                            <Button  disabled={cartItems.length<=0 }  onClick={handleViewCart} variant="contained" className="cart-button view-cart-btn" ><Typography>View cart</Typography></Button>
                    </ThemeProvider>
            </div>
        </Drawer>
    )
}