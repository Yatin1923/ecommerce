import * as React from 'react';
import './SignUp.css';
import { Button, Checkbox, Grid, Input, TextField, ThemeProvider, createTheme, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
export default function SignUp( ){
    const theme = createTheme({
        
        palette: {
          primary: {
            main: '#000',


          },
        },
      });
    const handleHaveAccount = ()=>{
        sethaveAccount(!haveAccount)
    }
    const handleFormChange = (e)=>{
        const { name, value, type, checked } = e.target;
        console.log(e.target);
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
          }));
    }
    const onSignUp = ()=>{
        console.log(formData);
    }
    const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreement: false, 
  });
    const [haveAccount, sethaveAccount] = React.useState(false);
    return (
     <div>
        <Grid container className='signup'>
            <Grid item md={6} xs={12} className='signup-image-div'>
                    <h2>3legant</h2>
                <div className='signup-image'>
                </div>
            </Grid>
            <Grid item md={6} xs={12} className='signup-form-container'>
                {!haveAccount?
                <form className='signup-form'>
                    <h2>Sign Up</h2>
                    <span>Already have an account? <b className='signup-link' onClick={handleHaveAccount}>Sign In</b></span>
                    <ThemeProvider theme={theme}>
                        <TextField required name="name"  type='text' value={formData.name} onChange={handleFormChange} variant="standard" label="Your name" className='input-field' />
                        <TextField required name="username" value={formData.username} onChange={handleFormChange} variant="standard" label="User name" className='input-field' />
                        <TextField required name="email" value={formData.email} onChange={handleFormChange} variant="standard" label="Email Address" />
                        <TextField required name="password" value={formData.password} onChange={handleFormChange} variant="standard" type='password' label="Password" className='input-field' />
                        <span><Checkbox required name="agreement" checked={formData.agreement} onChange={handleFormChange}></Checkbox>I agree with <b>Privacy Policy</b> and  <b>Terms of use</b></span>
                            <Button variant="contained" className="signup-button" type='submit' onClick={onSignUp}> Sign up</Button>
                    </ThemeProvider>
                 </form>
                :
                <form className='signin-form'>
                    <h2>Sign In</h2>
                    <span>Don't have an account yet? <b className='signup-link' onClick={handleHaveAccount}>Sign Up</b></span>
                    <ThemeProvider theme={theme}>
                    <TextField variant="standard" label="User name or Email" className='input-field' />
                    <TextField variant="standard" type='password' label="Password" className='input-field' />
                    <span><Checkbox></Checkbox>Remember me</span>
                    <NavLink to='/'>
                        <Button variant="contained" className="signup-button" type='submit'> Sign In</Button>
                    </NavLink>
                    </ThemeProvider>
                </form>
                }
            </Grid>
        </Grid>
     </div>   
    )
}