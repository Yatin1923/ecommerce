
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Reviews.component.css';
import Review_Helper from './Review-helper.component';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarRating from '../StarRating/StarRating';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function TabPanel(props:any) {
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
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
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
const text = "I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.";
export default function Reviews_component(props){
  const [review,setReview] = useState(new Array());
  const [rating,setRating] = useState(0);
  const [submitReview,setSubmitReview] = useState('');
  const fetchReview = ()=>{
    axios.get(`https://localhost:7275/api/Review?ItemId=${props.props?.id}`).then((response:any)=>{
      if(response.data.length>0){
        setReview(response.data);
      }
    })
  }
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
      const submit = ()=>{
        if(submitReview.trim() !='' && rating ){
          setReview([...review,{itemId:props.props?.id,review:submitReview,rating:rating,createdOn:new Date(Date.now()).toISOString(),createdBy:'Yatin'}])
          // axios.post('https://localhost:7275/api/Review',{itemId:props.props?.id,review:submitReview,rating:rating,createdOn:new Date(Date.now()).toISOString(),createdBy:'Yatin'}).then((response:any)=>{
          //   if(response.status ==200){
          //     setReview([...review,response.data])
          //   }
          // })
        }else{
          toast.error('Please add some rating to the product');
        }
      }
      const handleRatingChange = (newValue)=>{
        setRating(newValue);
      }
      useEffect(() => {
        // fetchReview();
      },[])
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Tabs value={value} onChange={handleChange}>
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
                  <Accordion className='product-questions'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}>
                      <Typography>What is the quality of material used?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='review-answers'>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  <Accordion className='product-questions'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}>
                      <Typography>Does paint come off after 6 months of use?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='review-answers'>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  <Accordion className='product-questions'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}>
                      <Typography>Is it strong enought to hold a person?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='review-answers'>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  <Accordion className='product-questions'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}>
                      <Typography>Can anyone tell me the exact size of this table with respect to a person?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='review-answers'>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </TabPanel>

                <TabPanel value={value} index={2}>
                <div className='reviews'>
                <ThemeProvider theme={theme}>
                  
                  <div className='product-rating'>
                    <h4>Please rate our product</h4>
                    <StarRating value={undefined} onChange={handleRatingChange}></StarRating>
                    <div className='review-textarea'>
                      <Textarea className='review-message' minRows={2} onBlur={(event)=>{setSubmitReview(event?.target.value)}} />
                      <Button variant='contained' className='review-button' onClick={submit}> Write a Review</Button>                    
                    </div>
                  </div>
                </ThemeProvider>
                  <div className='actual-reviews'>
                    <h3>{review.length} Reviews</h3>
                    <br></br>
                    {review?.map((item:any, index) => (
                      <div>
                        <Review_Helper img ={`ecommerce/assets/images/Table-placeholder-${Math.floor(Math.random()*3+1)}.png`} rating={item.rating} name={'Yatin'} text = {item.review}></Review_Helper>
                      </div>
                    ))}
                    
                  </div>
                </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}