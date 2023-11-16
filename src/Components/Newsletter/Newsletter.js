import './Newsletter.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from "@mui/material";
import CustomButton from "../../Components/Button/CustomButton";

export default function Newsletter(){
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
    return(
        <div className="Newsletter">
            <div className="newsletter-heading">
                <h1>Join Our Newsletter</h1>
                <p>Sign up for deals, new products and promotions</p>
            </div>
            <form className="subscribe-form">
                <ThemeProvider theme={theme}>
                    <TextField className="email-form" label='Email address'></TextField>
                </ThemeProvider>
            
                <CustomButton name='Signup'></CustomButton>
            </form>
        </div>
    )

}