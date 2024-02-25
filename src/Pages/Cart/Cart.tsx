import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Divider, FormControlLabel, IconButton, InputBase, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAsync } from '../../Redux/reducers'
import CloseIcon from '@mui/icons-material/Close';
import DiscountIcon from '@mui/icons-material/Discount';
import './Cart.css'
import ShippingCard from '../../Components/Shipping-card/ShippingCard';
import { Label } from '@mui/icons-material';
const steps = ['Shopping cart', 'Checkout details', 'Order complete'];

export default function Cart() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000'
            }
        }
    })
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleShippingChange = (event) => {
        if (event.target.value.toLowerCase() == "express shipping") {
            setCartSubtotal(cartInitialSubtotal + 15.99)
            setCarttotal(cartInitialTotal + 15.99)
        }
        if (event.target.value.toLowerCase() == "free shipping") {
            setCartSubtotal(cartInitialSubtotal)
            setCarttotal(cartInitialTotal)
        }
        if (event.target.value.toLowerCase() == "pick up") {
            let pickUpDiscount = cartSubtotal * 21 / 100
            setCartSubtotal(cartInitialSubtotal - pickUpDiscount)
            setCarttotal(cartInitialTotal - pickUpDiscount)
        }
    }
    const [cartSubtotal, setCartSubtotal] = React.useState(0);
    const [cartTotal, setCarttotal] = React.useState(0);
    const [cartInitialSubtotal, setCartInitialSubtotal] = React.useState(0);
    const [cartInitialTotal, setCartInitialTotal] = React.useState(0);
    let cartItems: any = useSelector((state: any) => state.user.cart);
    let total: number = 0
    let subtotal: number = 0
    React.useEffect(() => {
        cartItems.map(item => {
            total += (item.price * item.quantity)
            subtotal += (item.price)
        })
        setCartSubtotal(subtotal)
        setCarttotal(total)
        setCartInitialSubtotal(subtotal)
        setCartInitialTotal(total)
    }, [cartItems])
    const dispatch = useDispatch<any>();

    return (
        <div className='container'>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {activeStep == 0 ?
                    <>
                        <Box sx={{ display: 'flex', marginTop: '5vh', gap: '1vw' }}>
                            <TableContainer sx={{ width: '65%' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow
                                                key={item.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Box display='flex' gap='1vw' height='10vw' paddingTop={2}>
                                                        <div className='ci_image'>
                                                            <img src={item.imageUrl}></img>
                                                        </div>
                                                        <Box>
                                                            <div>
                                                                <strong>{item.name}</strong>
                                                            </div>
                                                            <div>
                                                                <Button sx={{ opacity: '0.5' }} onClick={() => dispatch(removeFromCartAsync(item))}>
                                                                    <CloseIcon></CloseIcon>Remove
                                                                </Button>
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">{item.price}</TableCell>
                                                <TableCell align="right">{item.price * item.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='cart-summary' >
                                <div className='summary-heading'>
                                    Cart summary
                                </div>
                                <RadioGroup className='shipping-cards' defaultValue="Free shipping">
                                    <div className="shipping-card-container">
                                    <FormControlLabel value="Free shipping" control={<Radio onChange={handleShippingChange} />} label="Free shipping" />
                                        <div className="shipping-cost">
                                            $0.00
                                        </div>
                                    </div>
                                    <div className="shipping-card-container">
                                        <FormControlLabel value="Express shipping" control={<Radio onChange={handleShippingChange} />} label="Express shipping" />
                                        <div className="shipping-cost">
                                            +$15.99
                                        </div>
                                    </div>
                                    <div className="shipping-card-container">
                                        <FormControlLabel value="Pick up" control={<Radio onChange={handleShippingChange} />} label="Pick up" />
                                        <div className="shipping-cost">
                                            %21.00
                                        </div>
                                    </div>
                                </RadioGroup>
                                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-around', gap: '1vh' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} className='cart-subtotal'>
                                        <span>Subtotal</span>
                                        <span>${cartSubtotal.toFixed(2)}</span>
                                    </Box>
                                    <Divider />
                                    <strong>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} className='cart-total'>
                                            <span>Total</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </Box>
                                    </strong>
                                    <Button variant="contained" onClick={handleNext}>Checkout</Button>
                                </Box>
                            </div>
                        </Box>
                        <Box>
                            <h4>Have a coupon?</h4>
                            <p style={{ opacity: '0.6' }}>Add your code for instant discount</p>
                            <Box
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '1px solid lightgrey' }}
                            >
                                <IconButton>
                                    <DiscountIcon></DiscountIcon>
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Coupon Code"
                                />
                                <Button type="button" sx={{ p: '10px', opacity: '0.8' }}>
                                    Apply
                                </Button>
                            </Box>

                        </Box>
                    </>
                    : activeStep == 1 ?
                        <>
                            <Box sx={{ display: 'flex', marginTop: '5vh', gap: '1vw', height: '100%' }}>
                                <div className='checkout-left'>
                                    <div className='contact-info'>
                                        <h4>Contact Information</h4>
                                        <Box sx={{ display: 'flex', gap: '1vw' }}>
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="First name" variant="outlined" />
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="Last name" variant="outlined" />
                                        </Box>
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Phone number" variant="outlined" />
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Email" variant="outlined" />
                                    </div>
                                    <div className='shipping-info'>
                                        <h4>Shipping Address</h4>
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Street Address" variant="outlined" />
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Country" variant="outlined" />
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Town/City" variant="outlined" />
                                        <Box sx={{ display: 'flex', gap: '1vw' }}>
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="State" variant="outlined" />
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="Zip Code" variant="outlined" />
                                        </Box>
                                    </div>
                                    <div className='payment-info'>
                                        <h4>Payment method</h4>
                                        <RadioGroup className='shipping-cards' defaultValue="Free shipping">
                                            <FormControlLabel className='payment-card-container' value="Payment by credit card" control={<Radio/>} label="Payment by credit card" />
                                            <FormControlLabel className='payment-card-container' value="Paypal" control={<Radio/>} label="Paypal" />
                                        </RadioGroup>
                                        <Divider></Divider>
                                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Card number" placeholder='1234 **** **** **54' variant="outlined" />
                                        <Box sx={{ display: 'flex', gap: '1vw' }}>
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="Expiration date" placeholder='MM/YY' variant="outlined" />
                                            <TextField sx={{ width: '50%' }} id="outlined-basic" label="CVC" variant="outlined" />
                                        </Box>
                                    </div>
                                </div>
                                <div className='checkout-right'>

                                </div>
                            </Box>
                        </> : <></>}
            </ThemeProvider>
        </div>
    );
}