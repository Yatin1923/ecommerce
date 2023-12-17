
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {  useTheme } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Reviews.component.css';
import { TextField } from "@mui/material";
import Review_Helper from './Review-helper.component';
import Button from '@mui/material/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = createTheme({
      palette: {
        primary: {
          main: '#000',
        },
      },
    });
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
const text = "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.";
export default function Reviews_component(){
    const [value, setValue] = useState(0);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
      };
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Tabs value={value} onChange={handleChange} textColor="black">
                    <Tab label="Additional Info"  />
                    <Tab label="Questions"  />
                    <Tab label="Reviews" />
                </Tabs>
            </ThemeProvider>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0}>
                <div className='additional-info'>
                    <h5>Details</h5>
                    <p>You can use the removable tray for serving. The design makes it easy to put the tray back after use since you place it directly on the table frame without having to fit it into any holes.</p>
                    <h5>Packaging</h5>
                    <p>Width: 20 " Height: 1 ½ " Length: 21 ½ "</p>
                    <p>Weight: 7 lb 8 oz</p>
                    <p>Package(s): 1</p>
                                        
                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                <div className='reviews'>
                <ThemeProvider theme={theme}>
                  <div className='review-textarea'>
                    <TextField className="review-message" label=''>\
                    </TextField>
                    <Button variant='contained' className='review-button'> Write a Review</Button>                    
                  </div>
                </ThemeProvider>
               
                  <h3>11 Reviews</h3>
                  <br></br>
                  <Review_Helper img ='assets/images/Table-placeholder-1.png' rating={Math.random()*5} name={'Sofia Harvetz'} text = {text}></Review_Helper>
                  <Review_Helper img ='assets/images/Table-placeholder-2.png' rating={Math.random()*5} name={'Sofia Harvetz'} text = {text}></Review_Helper>
                  <Review_Helper img ='assets/images/Table-placeholder-3.png' rating={Math.random()*5} name={'Sofia Harvetz'} text = {text}></Review_Helper>
                </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}