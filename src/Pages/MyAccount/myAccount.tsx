import React, { useState } from 'react'
import './myAccount.css'
import Box from '@mui/material/Box';
import { Divider, TextField, ThemeProvider, createTheme } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from "../../Interceptor/interceptor";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
interface IToken {
    Cart: string;
    Email: string;
    UserId: string;
    Name: string;
}
interface Order {
    id: number;
    date: string;
    paymentMethod: string;
    total: number;

}
export default function MyAccount() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000'
            }
        }
    })
    let token = localStorage.getItem('JWTToken') ?? ''
    let decodedToken: IToken = jwtDecode(token);
    const [selectedTab, setSelectedTab] = useState(0); // State to track selected tab index
    const accountTabClick = (index: number) => {
        switch (index) {
            case 0: break;
            case 1: break;
            case 2: {

                fetchOrders();
                break;
            }
            case 3: break;


        }
        setSelectedTab(index); // Update selected tab index
    };
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders = () => {
        axios.get(`Order?id=${decodedToken.UserId}`).then(res => {
            setOrders(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <Box sx={{ display: 'flex', margin: '20vh 0' }}>
                    <div className="account-left">
                        <div className="account-nav">
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vh' }}>
                                <div className="profile-img">
                                    <img src="assets\images\Table-placeholder-1.png" alt="" />
                                </div>
                                <h4>{decodedToken.Name}</h4>
                            </Box>
                            <br />
                            <div className={`account-tabs ${selectedTab === 0 && 'selected-tab'}`} onClick={() => { accountTabClick(0) }}>Account</div>
                            <div className={`account-tabs ${selectedTab === 1 && 'selected-tab'}`} onClick={() => { accountTabClick(1) }}>Address</div>
                            <div className={`account-tabs ${selectedTab === 2 && 'selected-tab'}`} onClick={() => { accountTabClick(2) }}>Orders</div>
                            <div className={`account-tabs ${selectedTab === 3 && 'selected-tab'}`} onClick={() => { accountTabClick(3) }}>Log Out</div>
                        </div>
                    </div>
                    <div className="account-right">
                        {selectedTab === 0 ?
                            <div className='account-info'>
                                <h4>Account Details</h4>
                                <TextField sx={{ width: '100%' }} label="Full name" variant="outlined" />
                                {/* <TextField sx={{ width: '100%' }} label="Last name" variant="outlined" />
                                <TextField sx={{ width: '100%' }} label="Display name" variant="outlined" /> */}
                                <TextField sx={{ width: '100%' }} label="Email" variant="outlined" />
                                <h4>Password</h4>
                                <TextField sx={{ width: '100%' }} label="Old password" type='password' variant="outlined" />
                                <TextField sx={{ width: '100%' }} label="New password" type='password' variant="outlined" />
                                <TextField sx={{ width: '100%' }} label="Repeat new password" type='password' variant="outlined" />
                            </div>
                            : selectedTab === 1 ?
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4vh' }}>
                                    <h4>Shipping Address</h4>
                                    <TextField sx={{ width: '100%' }} label="Street Address" variant="outlined" />
                                    <TextField sx={{ width: '100%' }} label="Country" variant="outlined" />
                                    <TextField sx={{ width: '100%' }} label="Town/City" variant="outlined" />
                                    <Box sx={{ display: 'flex', gap: '1vw' }}>
                                        <TextField sx={{ width: '50%' }} label="State" variant="outlined" />
                                        <TextField sx={{ width: '50%' }} label="Zip Code" variant="outlined" />
                                    </Box>
                                    <h4>Billing Address</h4>
                                    <TextField sx={{ width: '100%' }} label="Street Address" variant="outlined" />
                                    <TextField sx={{ width: '100%' }} label="Country" variant="outlined" />
                                    <TextField sx={{ width: '100%' }} label="Town/City" variant="outlined" />
                                    <Box sx={{ display: 'flex', gap: '1vw' }}>
                                        <TextField sx={{ width: '50%' }} label="State" variant="outlined" />
                                        <TextField sx={{ width: '50%' }} label="Zip Code" variant="outlined" />
                                    </Box>
                                </Box>
                                : selectedTab === 2 ?
                                    <div className="order-info">
                                        <TableContainer component={Paper} sx={{ maxHeight: '66vh', overflow:'auto' }}>
                                            <Table sx={{ minWidth: 650 }} >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell >Order Id</TableCell>
                                                        <TableCell >Date</TableCell>
                                                        <TableCell >Payment Method</TableCell>
                                                        <TableCell >Total</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {orders.map((order) => (
                                                        <TableRow
                                                            key={order.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">#{order.id}</TableCell>
                                                            <TableCell >{new Date(order.date).toDateString()}</TableCell>
                                                            <TableCell >{order.paymentMethod}</TableCell>
                                                            <TableCell >{Number(order.total).toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    : <></>
                        }
                    </div>
                </Box>
            </div>
        </ThemeProvider>
    )
}