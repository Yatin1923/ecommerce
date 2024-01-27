import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAsync } from '../../Redux/reducers'
import CloseIcon from '@mui/icons-material/Close';
import DiscountIcon from '@mui/icons-material/Discount';
const steps = ['Shopping cart', 'Checkout details', 'Order complete'];

export default function Cart() {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000'
            }
        }
    })
    let cartItems = useSelector((state: any) => state.cart);
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
                <Box sx={{ display: 'flex', marginTop: '5vh' }}>
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
                </Box>
                <Box>
                    <h4>Have a coupon?</h4>
                    <p style={{ opacity: '0.6' }}>Add your code for instant discount</p>
                    <Box
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border:'1px solid lightgrey'}}
                    >
                       <IconButton>
                                    <DiscountIcon></DiscountIcon>
                       </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Coupon Code"
                        />
                        <Button type="button" sx={{ p: '10px',opacity:'0.8' }}>
                            Apply
                        </Button>
                    </Box>

                </Box>
            </ThemeProvider>
        </div>
    );
}