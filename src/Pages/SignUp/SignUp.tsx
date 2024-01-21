import * as React from 'react';
import './SignUp.css';
import { Button, Checkbox, FormControl, Grid, Input, TextField, ThemeProvider, createTheme, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
export default function SignUp( ){
    type FormValues = {
        name:string,
        email:string,
        password:string
    }
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
  const form  = useForm<FormValues>({
    defaultValues:{
        email:'',
        name:'',
        password:''
    }
  });

  const {register,handleSubmit,formState}  = form
  const {errors} = formState 
    const [haveAccount, sethaveAccount] = React.useState(false);
    const navigate = useNavigate()
    const onSubmit = (data:FormValues)=>{
        if(haveAccount){
            axios.post('https://localhost:7275/api/User/Authenticate',{email:data.email,password:data.password}).then(res=>{
                if(res.data){
                    navigate('/');
                }
            })
        }else{
            axios.post('https://localhost:7275/api/User',{name:data.name, email:data.email,password:data.password}).then(res=>{
                if(res.data){
                    navigate('/');
                }
            })
        }
    }
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
                <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Sign Up</h2>
                    <span>Already have an account? <b className='signup-link' onClick={handleHaveAccount}>Sign In</b></span>
                    <ThemeProvider theme={theme}>
                        <TextField {...register('name')} error={!!errors.name} helperText={!!errors.name?.message} required name="name"  type='text'   variant="standard" label="Your name" className='input-field' />
                        <TextField {...register('email')} error={!!errors.email} helperText={!!errors.email?.message} required name="email"   variant="standard" label="Email Address" />
                        <TextField {...register('password')} error={!!errors.password} helperText={!!errors.password?.message} required name="password"   variant="standard" type='password' label="Password" className='input-field' />
                        <span><Checkbox required name="agreement"  ></Checkbox>I agree with <b>Privacy Policy</b> and  <b>Terms of use</b></span>
                            <Button variant="contained" className="signup-button" type='submit'> Sign up</Button>
                    </ThemeProvider>
                 </form>
                :
                <form className='signin-form' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Sign In</h2>
                    <span>Don't have an account yet? <b className='signup-link' onClick={handleHaveAccount}>Sign Up</b></span>
                    <ThemeProvider theme={theme}>
                    <TextField required  {...register('email')} error={!!errors.email}  variant="standard" label="Email"   className='input-field' />
                    <TextField required   {...register('password')} error={!!errors.password} variant="standard" type='password' label="Password"   className='input-field' />
                    <span><Checkbox></Checkbox>Remember me</span>
                        <Button variant="contained" className="signup-button" type='submit'> Sign In</Button>
                    </ThemeProvider>
                </form>
                }
            </Grid>
        </Grid>
     </div>   
    )
}