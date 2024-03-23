import React, { useState } from 'react'
import './myAccount.css'
import Box from '@mui/material/Box';
import { Divider, TextField, ThemeProvider, createTheme } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
interface IToken {
    Cart:string;
    Email:string;
    UserId:string;
    Name:string;
}
export default function MyAccount() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000'
            }
        }
    })
    let token = localStorage.getItem('JWTToken')??''
    let decodedToken:IToken = jwtDecode(token);
    const [selectedTab, setSelectedTab] = useState(0); // State to track selected tab index
    const accountTabClick = (index: number) => {
        setSelectedTab(index); // Update selected tab index
    };

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
                            :
                            <Box sx={{display:'flex',flexDirection:'column',gap:'4vh'}}>
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
                            }
                    </div>
                </Box>
            </div>
        </ThemeProvider>
    )
}