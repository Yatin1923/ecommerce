import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Badge, Divider, FormControlLabel, IconButton, InputBase, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAsync } from '../../Redux/reducers'
import CloseIcon from '@mui/icons-material/Close';
import DiscountIcon from '@mui/icons-material/Discount';
import './Cart.css'
import ShippingCard from '../../Components/Shipping-card/ShippingCard';
import { Label } from '@mui/icons-material';
import CartItem from '../../Components/Cart-Item/CartItem';
import { jwtDecode } from 'jwt-decode';
import { useForm } from "react-hook-form";
import axios from "../../Interceptor/interceptor";
import _ from 'lodash';
const steps = ['Shopping cart', 'Checkout details', 'Order complete'];
interface IToken {
    Cart: string;
    Email: string;
    UserId: string;
    Name: string;
}
export default function Cart() {
    type FormValues = {
        name: string;
        phone: string;
        email: string;
        streetAddress: string;
        country: string;
        city: string;
        state: string;
        zipCode: string;
        cardNumber: string;
        cardExpiry: string;
        cardCVC: string;
    };


    const theme = createTheme({
        palette: {
            primary: {
                main: '#000'
            }
        }
    })
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            top: 5,
            backgroundColor: 'black',
            color: 'white',
            // border: `2px solid ${theme.palette.background.paper}`,
            padding: '8px',
        },
    }));
    let token = localStorage.getItem('JWTToken') ?? ''
    let decodedToken: IToken = jwtDecode(token);
    const form = useForm<FormValues>({
        defaultValues: {
            name: decodedToken.Name,
            phone: "",
            email: decodedToken.Email,
            streetAddress: decodedToken.Name,
            city: "",
            country: decodedToken.Email,
            state: decodedToken.Email,
            zipCode: "",
        },
    });
    let cartItems: any[] = useSelector((state: any) => state.user.cart);
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [activeStep, setActiveStep] = React.useState(0);
    const [shipping, setShipping] = React.useState(0);
    const [orderedItems, setOrderedItems] = React.useState<any[]>(cartItems);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo({ top: 0, behavior: 'instant' })
    };
    const onSubmit = (data:FormValues)=>{
        let itemIds = cartItems.map(item=>item.id).join(',')
           
            axios.post('Order',{
                userId:decodedToken.UserId,
                date:new Date(Date.now()),
                total:total.toString(),
                paymentMethod:'card',
                itemId:itemIds
                
            }).then((res)=>{
                handleNext();
                setOrderedItems(cartItems);
                cartItems.forEach((item:any)=>{
                    dispatch(removeFromCartAsync(item))
                })
                console.log("orderItems",orderedItems);
            },(error)=>{
                console.error(error);
            })
        console.log(data)
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleShippingChange = (event) => {
        if (event.target.value.toLowerCase() == "express shipping") {
            setCartSubtotal(cartInitialSubtotal + 15.99)
            setCarttotal(cartInitialTotal + 15.99)
            setShipping(15.99)

        }
        if (event.target.value.toLowerCase() == "free shipping") {
            setShipping(0)
            setCartSubtotal(cartInitialSubtotal)
            setCarttotal(cartInitialTotal)
        }
        if (event.target.value.toLowerCase() == "pick up") {
            let pickUpDiscount = cartSubtotal * 21 / 100
            setShipping((-pickUpDiscount));
            setCartSubtotal(cartInitialSubtotal - pickUpDiscount)
            setCarttotal(cartInitialTotal - pickUpDiscount)
        }
    }
    const handleStepperClick = (index: number) => {
        if (index < activeStep && activeStep != 2) {
            setActiveStep(index);
        }
        window.scrollTo({ top: 0 })
    }
    const [cartSubtotal, setCartSubtotal] = React.useState(0);
    const [cartTotal, setCarttotal] = React.useState(0);
    const [cartInitialSubtotal, setCartInitialSubtotal] = React.useState(0);
    const [cartInitialTotal, setCartInitialTotal] = React.useState(0);
    let total: number = 0
    let subtotal: number = 0
    React.useEffect(() => {
        cartItems.forEach(item => {
            total += (item.price * item.quantity)
            subtotal += (item.price)
        })
        setCartSubtotal(subtotal)
        setCarttotal(total)
        setCartInitialSubtotal(subtotal)
        setCartInitialTotal(total)
            window.scrollTo({ top: 0, behavior: 'instant' });
    }, [cartItems])
    const dispatch = useDispatch<any>();

    return (
        <div className='container'>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} sx={{ cursor: 'pointer' }} onClick={() => handleStepperClick(index)} >
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
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Box sx={{ display: 'flex', marginTop: '5vh', gap: '1vw', height: '100%' }}>
                                    <div className='checkout-left'>
                                        <div className='contact-info'>
                                            <h4>Contact Information</h4>
                                            <Box sx={{ display: 'flex', gap: '1vw' }}>
                                                <TextField error={!!errors.name} helperText={!!errors.name?.message} required {...register("name")} sx={{ width: '100%' }} id="outlined-basic" label="Full name" variant="outlined" />
                                                {/* <TextField sx={{ width: '50%' }} id="outlined-basic" label="Last name" variant="outlined" /> */}
                                            </Box>
                                            <TextField error={!!errors.phone} helperText={!!errors.phone?.message} required {...register("phone")} sx={{ width: '100%' }} id="outlined-basic" type='number' label="Phone number" variant="outlined" />
                                            <TextField error={!!errors.email} helperText={!!errors.email?.message} required {...register("email")} sx={{ width: '100%' }} id="outlined-basic" label="Email" variant="outlined" />
                                        </div>
                                        <div className='shipping-info'>
                                            <h4>Shipping Address</h4>
                                            <TextField {...register("streetAddress")} required error={!!errors.streetAddress} helperText={!!errors.streetAddress?.message} sx={{ width: '100%' }} id="outlined-basic" label="Street Address" variant="outlined" />
                                            <TextField {...register("country")} required error={!!errors.country} helperText={!!errors.country?.message} sx={{ width: '100%' }} id="outlined-basic" label="Country" variant="outlined" />
                                            <TextField {...register("city")} required error={!!errors.city} helperText={!!errors.city?.message} sx={{ width: '100%' }} id="outlined-basic" label="Town/City" variant="outlined" />
                                            <Box sx={{ display: 'flex', gap: '1vw' }}>
                                                <TextField {...register("state")} required error={!!errors.state} helperText={!!errors.state?.message} sx={{ width: '50%' }} id="outlined-basic" label="State" variant="outlined" />
                                                <TextField {...register("zipCode")} required error={!!errors.zipCode} helperText={!!errors.zipCode?.message} sx={{ width: '50%' }} id="outlined-basic" label="Zip Code" variant="outlined" />
                                            </Box>
                                        </div>
                                        <div className='payment-info'>
                                            <h4>Payment method</h4>
                                            <RadioGroup className='shipping-cards' defaultValue="card">
                                                <FormControlLabel className='payment-card-container' value="card" control={<Radio />} label="Payment by credit card" />
                                                <FormControlLabel className='payment-card-container' value="Paypal" control={<Radio />} label="Paypal" />
                                                <FormControlLabel className='payment-card-container' value="COD" control={<Radio />} label="Cash on delivery" />
                                            </RadioGroup>
                                            <Divider></Divider>
                                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Card number" placeholder='1234 **** **** **54' variant="outlined" />
                                            <Box sx={{ display: 'flex', gap: '1vw' }}>
                                                <TextField sx={{ width: '50%' }} id="outlined-basic" label="Expiration date" placeholder='MM/YY' variant="outlined" />
                                                <TextField sx={{ width: '50%' }} id="outlined-basic" label="CVC" variant="outlined" />
                                            </Box>
                                        </div>
                                        <Button sx={{ width: '100%' }} variant="contained" type='submit'>Place your order</Button>
                                    </div>


                                    <div className='order-summary' >
                                        <div className='summary-heading'>
                                            Order summary
                                        </div>
                                        <Box sx={{ margin: '2vh 0' }}>

                                            {cartItems.length > 0 ?
                                                cartItems.map(item =>
                                                    <CartItem id={item.id} image={item.imageUrl} name={item.name} key={item.name} color="black" quantity={item.quantity ?? 1} price={item.price}></CartItem>)
                                                :
                                                <h4>Cart is Empty</h4>}
                                        </Box>
                                        <Box
                                            sx={{ p: '2px 4px', margin: '2vh 0', display: 'flex', alignItems: 'center', width: 400, border: '1px solid lightgrey' }}
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

                                        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-around', gap: '1vh' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} className='cart-subtotal'>
                                                <span>Shipping</span>
                                                <span>${shipping.toFixed(2)}</span>
                                            </Box>
                                            <Divider />
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
                                        </Box>
                                    </div>
                                </Box>
                            </form>
                        </> :
                        activeStep == 2 ?
                            <>
                                <Box className='order-heading' sx={{ textAlign: 'center', margin: '5vh 0' }}>
                                    <h3 className='order-heading-thanks'>Thank you!</h3>
                                    <div>
                                        <h2>Your Order has been recieved</h2>
                                    </div>
                                </Box>
                                <Box sx={{ display: 'flex', gap: '1vw', height: '10vw', justifyContent: 'center', margin: '5vh 0' }} >
                                    {orderedItems.length > 0 ?
                                        orderedItems.map(item =>
                                            <StyledBadge badgeContent={item.quantity ?? 1} key={item.id}>
                                                <div className='order-items'>
                                                    <img src={item.imageUrl} className='order-images'></img>
                                                </div>
                                            </StyledBadge>
                                        )
                                        :
                                        <></>}
                                </Box>
                                <Box sx={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
                                    <div className="orderDetails-left">
                                        <div className='order-details-heading'>Order code:</div>
                                        <div className='order-details-heading'>Date:</div>
                                        <div className='order-details-heading'>Total:</div>
                                        <div className='order-details-heading'>Payment method:</div>
                                    </div>
                                    <div className="orderDetails-right">
                                        <div className='order-details-info'>#{Number(Math.random() * 10000).toFixed(0)}</div>
                                        <div className='order-details-info'>{new Date(Date.now()).toDateString()}</div>
                                        <div className='order-details-info'>${cartTotal}</div>
                                        <div className='order-details-info'>Paypal</div>
                                    </div>
                                </Box>
                            </>
                            :
                            <></>}
            </ThemeProvider>
        </div>
    );
}