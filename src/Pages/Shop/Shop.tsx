import { Key, useEffect, useState } from "react";
import Transitions from "../../Components/Transition/Transition";
import './Shop.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import ItemCard from "../../Components/Item-card/ItemCard";
import React from "react";
import axios from 'axios'
import LoadingButton from "@mui/lab/LoadingButton";

export interface Items{
    id: Key ;
    name:string,
    imageUrl:string,
    quantity:Number,
    rating:Number,
    price:string,
    new:boolean,
    discount:Number

}
export default function Shop(){
    let initialItemsData = [
        { name: 'Loveseat Sofa', imageUrl: '/assets/images/Sofa.svg', quantity: 1, rating: 5, price: '199.99', oldprice: '400.00', new: true, discount: 50 },
        { name: 'Side Table', imageUrl: 'assets/images/Bedroom-side-table.svg', quantity: 1, rating: 5, price: '49.99', oldprice: '100.00', new: true, discount: 50 },
        { name: 'Table Lamp', imageUrl: 'assets/images/Table-lamp.svg', quantity: 1, rating: 4, price: '89.99', oldprice: '100.00', new: true, discount: 10 },
        { name: 'Toaster', imageUrl: 'assets/images/Toaster-crop.svg', quantity: 1, rating: 4.5, price: '109.99', new: true },
        { name: 'Beige Table Lamp', imageUrl: 'assets/images/Table-lamp-2.svg', quantity: 1, rating: 3.2, price: '99.99', new: true },
        { name: 'Basket', imageUrl: 'assets/images/Basket.svg', quantity: 1, rating: 3.5, price: '29.99', new: true },
      ];
      const[itemsData, setItemsData]= useState<Items[]>([])
      const[filteredData, setfilteredData]= useState<Items[]>([])
      const[showMoreCount, setShowMoreCount]= useState(0)
      const[loading, setloading]= useState(false)
      const showMore = ()=>{
        setloading(true)
        setTimeout(()=>{

            setShowMoreCount(showMoreCount+1);
            if(showMoreCount<2){
                setfilteredData(prevItemsData =>[...prevItemsData,...prevItemsData] )
            }
            setloading(false)
        },1000)
        }
    const [categories, setCategories] = useState('');
    const [price, setPrice] = useState('');

    const fetchData = async () => {
        try {
            axios.get('https://localhost:7275/api/Item').then(response=>{

                
                if(response.data){
                    setItemsData(response.data);
                    setfilteredData(response.data)
                }
            })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{

        //fetchData();
        return()=>{
            window.scrollTo({top:0,behavior:'instant'});
        }
    },[]);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
   

    const handleCategories = (event) => {
        setCategories(event.target.value);
    };
    const handlePrice = (event) => {
        let selectedPrice = event.target.value;
        setPrice(event.target.value);
        let filteredItem;
        switch (selectedPrice) {
            case 100:
                filteredItem = itemsData.filter(x => Number(x.price) >= 0 && Number(x.price) < 100);
                break;
            case 200:
                filteredItem = itemsData.filter(x => Number(x.price) >= 100 && Number(x.price) < 200);
                break;
            case 300:
                filteredItem = itemsData.filter(x => Number(x.price) >= 200 && Number(x.price) < 300);
                break;
            case 400:
                filteredItem = itemsData.filter(x => Number(x.price) >= 300 && Number(x.price) < 400);
                break;
            case 500:
                filteredItem = itemsData.filter(x => Number(x.price) >= 400);
                break;
            default:
                filteredItem = itemsData; // If "All Price" or unknown value, show all items
                break;
        }
        setfilteredData(filteredItem);
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
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                        <InputLabel>Categories</InputLabel>
                        <Select value={categories} label="Categories" onChange={handleCategories}>
                            <MenuItem value={1}>Bedroom</MenuItem>
                            <MenuItem value={2}>Kitchen</MenuItem>
                            <MenuItem value={3}>Bathroom</MenuItem>
                            <MenuItem value={4}>Dining</MenuItem>
                            <MenuItem value={5}>Outdoor</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Price</InputLabel>
                        <Select value={price} label="Price" onChange={handlePrice}>
                            <MenuItem value={0}>All Price</MenuItem>
                            <MenuItem value={100}>$0.00 - $99.99</MenuItem>
                            <MenuItem value={200}>$100.00 - $199.99</MenuItem>
                            <MenuItem value={300}>$200.00 - $299.99</MenuItem>
                            <MenuItem value={400}>$300.00 - $399.99</MenuItem>
                            <MenuItem value={500}>$400.00+</MenuItem>
                        </Select>
                    </FormControl>
                    </ThemeProvider>

                </div>
                <div className="shop-item">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* {filteredData?.map((item, index) => (
                        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <ItemCard {...item} />
                        </Grid>
                    ))} */}
                        <Grid key={1} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Loveseat Sofa' imageUrl='/assets/images/Sofa.svg' quantity={1} rating={5} price='199.99' oldprice='400.00' isNew={true} discount={50} />
                        </Grid>
                        <Grid key={2} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Side Table' imageUrl='assets/images/Bedroom-side-table.svg' quantity={1} rating={5} price='49.99' oldprice='100.00' isNew={true} discount={50} />

                        </Grid>
                        <Grid key={3} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Table Lamp' imageUrl='assets/images/Table-lamp.svg' quantity={1} rating={4} price='89.99' oldprice='100.00' isNew={true} discount={10} />
                        </Grid>
                        <Grid key={4} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Toaster' imageUrl='assets/images/Toaster-crop.svg' quantity={1} rating={4.5} price='109.99' isNew={true} />

                        </Grid>
                        <Grid key={5} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Beige Table Lamp' imageUrl='assets/images/Table-lamp-2.svg' quantity={1} rating={3.2} price='99.99' isNew={true} />

                        </Grid>
                        <Grid key={6} item xs={12} sm={6} md={4} lg={3}>
                            <ItemCard name='Basket' imageUrl='assets/images/Basket.svg' quantity={1} rating={3.5} price='29.99' isNew={true} />

                        </Grid>
                    
                    </Grid>
                    <div hidden={showMoreCount>=2} className="show-more">
                        <ThemeProvider theme={theme}>
                            <LoadingButton  loading={loading} variant="contained"  className="" onClick={showMore}> Show more</LoadingButton>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            </Transitions>
        </div>
    )
}