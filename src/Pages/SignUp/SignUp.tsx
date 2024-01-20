import * as React from 'react';
import './SignUp.css';
import { Button, Checkbox, Grid, TextField, ThemeProvider, createTheme, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
export default function SignUp( ){
    const theme = createTheme({
        
        palette: {
          primary: {
            main: '#000',


          },
        },
      });
      const CustomTextField = styled(TextField)`
      .MuiInputBase-root {
        background-color: #fff
      }
    `;
    const handleHaveAccount = ()=>{
        sethaveAccount(!haveAccount)
    }
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
                    <CustomTextField variant="filled" label="Your name" className='input-field' />
                    <CustomTextField variant="filled" label="User name" className='input-field' />
                    <CustomTextField variant="filled" label="Email Address" />
                    <CustomTextField variant="filled" type='password' label="Password" className='input-field' />
                    <span><Checkbox></Checkbox>I agree with <b>Privacy Policy</b> and  <b>Terms of use</b></span>
                    <NavLink to='/'>
                        <Button variant="contained" className="signup-button" type='submit'> Sign up</Button>
                    </NavLink>
                    </ThemeProvider>
                </form>
                :
                <form className='signin-form'>
                    <h2>Sign In</h2>
                    <span>Don't have an account yet? <b className='signup-link' onClick={handleHaveAccount}>Sign Up</b></span>
                    <ThemeProvider theme={theme}>
                    <CustomTextField variant="filled" label="User name or Email" className='input-field' />
                    <CustomTextField variant="filled" type='password' label="Password" className='input-field' />
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