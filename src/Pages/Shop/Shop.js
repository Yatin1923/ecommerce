import { useEffect, useState } from "react";
import Transitions from "../../Components/Transition/Transition";
import './Shop.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import ItemCard from "../../Components/Item-card/ItemCard";


export default function Shop(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
    const [categories, setCategories] = useState('');
    const [price, setPrice] = useState('');

    const handleCategories = (event) => {
        setCategories(event.target.value);
    };
    const handlePrice = (event) => {
        setPrice(event.target.value);
    };
    return(
        <div className="container">
            <Transitions>
            <div className="shop-heading">
                <h1>Shop Page</h1>
                <p>Let's design the place you always imagined.</p>
            </div>
            <div className="shop-items">
                <div className="shop-filter">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                        <Select value={categories} label="Categories" onChange={handleCategories}>
                            <MenuItem value={'Bedroom'}>Bedroom</MenuItem>
                            <MenuItem value={'Kitchen'}>Kitchen</MenuItem>
                            <MenuItem value={'Bathroom'}>Bathroom</MenuItem>
                            <MenuItem value={'Dining'}>Dining</MenuItem>
                            <MenuItem value={'Outdoor'}>Outdoor</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Price</InputLabel>
                        <Select value={price} label="Price" onChange={handlePrice}>
                            <MenuItem value={'All'}>All Price</MenuItem>
                            <MenuItem value={'$0.00 - $99.99'}>$0.00 - $99.99</MenuItem>
                            <MenuItem value={'$100.00 - $199.99'}>$100.00 - $199.99</MenuItem>
                            <MenuItem value={'$200.00 - $299.99'}>$200.00 - $299.99</MenuItem>
                            <MenuItem value={'$300.00 - $399.99'}>$300.00 - $399.99</MenuItem>
                            <MenuItem value={'$400.00+'}>$400.00+</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="shop-item">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Loveseat Sofa' image='/assets/images/Sofa.svg' rating={5} price='199.99' oldprice='400.00' new={true} discount={50}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Side Table' image='assets/images/Bedroom-side-table.svg' rating={5} price='49.99' oldprice='100.00' new={true} discount={50}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Table Lamp' image='assets/images/Table-lamp.svg' rating={4} price='89.99' oldprice='100.00' new={true} discount={10}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Toaster' image='assets/images/Toaster-crop.svg' rating={4.5} price='109.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Beige Table Lamp' image='assets/images/Table-lamp-2.svg' rating={3.2} price='99.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Basket' image='assets/images/Basket.svg' rating={3.5} price='29.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Loveseat Sofa' image='/assets/images/Sofa.svg' rating={5} price='199.99' oldprice='400.00' new={true} discount={50}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Side Table' image='assets/images/Bedroom-side-table.svg' rating={5} price='49.99' oldprice='100.00' new={true} discount={50}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Table Lamp' image='assets/images/Table-lamp.svg' rating={4} price='89.99' oldprice='100.00' new={true} discount={10}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Toaster' image='assets/images/Toaster-crop.svg' rating={4.5} price='109.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Beige Table Lamp' image='assets/images/Table-lamp-2.svg' rating={3.2} price='99.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Basket' image='assets/images/Basket.svg' rating={3.5} price='29.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Beige Table Lamp' image='assets/images/Table-lamp-2.svg' rating={3.2} price='99.99' new={true}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name ='Basket' image='assets/images/Basket.svg' rating={3.5} price='29.99' new={true}/>
                        </Grid>
                    </Grid>
                    <div className="show-more">
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" className=""> Show more</Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            </Transitions>
        </div>
    )
}