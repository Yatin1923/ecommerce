import { useEffect } from 'react';
import Transitions from '../../Components/Transition/Transition'
import './Contact.css'
import CustomButton from '../../Components/Button/CustomButton';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


export default function Contact(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
    const theme1 = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderColor: '#000',
              },
            },
          },
        },
      });
    const theme = createTheme({
        
        palette: {
          primary: {
            main: '#000',

          },
        },
      });
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: #1C2025;
        border: 1px solid #1C2025;
        box-shadow: 0px 2px 2px #F3F6F9;
    
        &:hover {
          border-color: #B0B8C4;
        }
    
        &:focus {
          border-color: #B0B8C4;
          box-shadow: 0 0 0 3px #DAE2ED;
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );
    return(
       
        <div className="container">
            <Transitions>
                <div className='page-heading'>
                    <h1>We believe in sustainable decor. <br></br> We’re passionate about life at home.</h1>
                    <p>Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. 
                    The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present</p>
                </div>
                <div className="about">
                        <div className="about-left">
                            <img src='assets/images/Living-room-3.svg'></img>
                        </div>
                        <div className="about-right">
                            {/* <p>SALE UPTO 35% OFF</p> */}
                            <h1>About Us</h1>
                            <p>3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019. </p>
                            <p>Our customer service is always prepared to support you 24/7 </p>
                            <div className="button">
                                <CustomButton name='Shop now' href='/shop'></CustomButton>
                            </div>
                        </div>
                </div>
                <div className='contact'>
                    <div className='contact-heading'>
                        <h1>Contact Us</h1>
                        </div>
                        <div className='contact-cards'>
                            <div className='contact-card'>
                            <img src='assets/icons/store.svg'></img>
                                <h5>ADDRESS</h5>
                                <strong>234 Hai Trieu, Ho Chi Minh City, Viet Nam</strong>
                            </div>
                            <div className='contact-card'>
                                <img src='assets/icons/call.svg'></img>
                                <h5>CONTACT US</h5>
                                <strong>234 Hai Trieu, Ho Chi Minh City, Viet Nam</strong>
                            </div>
                            <div className='contact-card'>
                                <img src='assets/icons/mail.svg'></img>
                                <h5>EMAIL</h5>
                                <strong>234 Hai Trieu, Ho Chi Minh City, Viet Nam</strong>
                            </div>
                        </div>
                        <form className='submit-form'>
                            <label>FULL NAME</label>
                            <TextField id="outlined-basic" label="Full name" variant="outlined" className='input-field' />
                            <label>EMAIL ADDRESS</label>
                            <TextField id="outlined-basic" label="Email Address" variant="outlined" />
                            <label>MESSAGE</label>
                            <Textarea placeholder='Message' minRows={5} />
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" className="submit-button" type='submit'> Send Message</Button>
                            </ThemeProvider>
                        </form>
                </div>
            </Transitions>
        </div>
    )
}