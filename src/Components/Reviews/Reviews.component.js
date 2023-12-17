
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {  useTheme } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Reviews.component.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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

export default function Reviews_component(){
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const _theme = createTheme({
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
            <ThemeProvider theme={_theme}>
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
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum, massa eu pretium venenatis, dolor orci convallis quam, sit amet fermentum tellus dolor ut magna.</p>
                    
                    <p>Curabitur ut quam a velit bibendum blandit. Nullam vitae ligula sed tellus consequat luctus. Donec sed lacinia lectus, eleifend ultrices mauris.Ut eu dui accumsan, scelerisque tortor congue, sodales lorem.</p> 
                    <p>Quisque vulputate eros vel ipsum euismod vulputate. Duis sodales felis nunc, sollicitudin consectetur tellus imperdiet luctus. Morbi lacinia in nisl sed consequat. </p>
                    
                    
                    <p> Praesent venenatis et orci et placerat. Nunc non bibendum sapien. Vestibulum scelerisque ultricies lectus in porta. Etiam sed sapien metus. Quisque vulputate molestie aliquet. </p>
                    
                    <p>Donec ultrices dolor felis, in mattis urna porttitor tempus. Etiam iaculis iaculis turpis, ut hendrerit tortor suscipit eu. Duis tempus magna at ante cursus, vel feugiat diam lacinia. Duis ut mauris dapibus, pharetra justo sit amet, fringilla nisi. In maximus libero sit amet aliquet sollicitudin. In hac habitasse platea dictumst.</p>
                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                Item Three
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}