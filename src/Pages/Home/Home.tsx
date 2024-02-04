import CustomCarousel from "../../Components/Carousel/Carousel";
import CustomButton from "../../Components/Button/CustomButton";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import './Home.css';
import Transitions from "../../Components/Transition/Transition";
import { useEffect, useState } from "react";
import ItemCard from "../../Components/Item-card/ItemCard";
import React from "react";
import axios from "axios";
import { Items } from "../Shop/Shop";
export default function Home(){
    const[itemsData, setItemsData]= useState<Items[]>([])
    const fetchData = async () => {
        try {
            axios.get('https://localhost:7275/api/Item').then(response=>{

                
                if(response.data){
                    setItemsData(response.data);
                }
            })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{
        //fetchData();
        window.scrollTo({top:0,behavior:'instant'});
    },[]);
 
      
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <div>

            <div className='container'>
                <Transitions>
                    <CustomCarousel/>
                    <div className="Categories">
                        <div className="Categories-heading">
                            <h1>Simply Unique/ <br></br> Simple Better</h1>
                            <p>3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019. </p>
                        </div>
                        <div className="Categories-flex">
                            <div className="Categories-left">
                                <div className="Living-room">
                                    <h1>Living Room</h1>
                                    <CustomButton name="Shop Now" href='/shop'/>
                                </div>
                            </div>
                            <div className="Categories-right">
                                <div className="Bedroom">
                                <h1>Bedroom</h1>
                                    <CustomButton name="Shop Now" href='/shop'/>
                                </div>
                                <div className="Kitchen">
                                <h1>Kitchen</h1>
                                    <CustomButton name="Shop Now" href='/shop'/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="New-Arrivals">
                        <div className="New-Arrivals-heading">
                            <h1>New <br></br> Arrivals</h1>
                            <CustomButton name="More Products" href='/shop'/>
                        </div>
                        <Carousel responsive={responsive} showDots={true}>
                        {/* {itemsData?.map((item, index) => (
                        <ItemCard key={item.id} {...item} />
                        ))} */}
                            <ItemCard name ='Loveseat Sofa' imageUrl='/assets/images/Sofa.svg' quantity={1} rating={5} price='199.99' oldprice='400.00' isNew={true} discount={50}/>
                            <ItemCard name ='Side Table' imageUrl='assets/images/Bedroom-side-table.svg' quantity={1} rating={5} price='49.99' oldprice='100.00' isNew={true} discount={50}/>
                            <ItemCard name ='Table Lamp' imageUrl='assets/images/Table-lamp.svg' quantity={1} rating={4} price='89.99' oldprice='100.00' isNew={true} discount={10}/>
                            <ItemCard name ='Toaster' imageUrl='assets/images/Toaster-crop.svg' quantity={1} rating={4.5} price='109.99' isNew={true}/>
                            <ItemCard name ='Beige Table Lamp' imageUrl='assets/images/Table-lamp-2.svg' quantity={1} rating={3.2} price='99.99' isNew={true}/>
                            <ItemCard name ='Basket' imageUrl='assets/images/Basket.svg' quantity={1} rating={3.5} price='29.99' isNew={true}/>
                        </Carousel>
                    </div>
                    <div className="features">
                        <div className="eccards">
                            <div className="eccard">
                                <img src='assets/icons/fast delivery.svg'></img>
                                <h5>Free Shipping</h5>
                                <p>Order above $200</p>
                            </div>
                            <div className="eccard">
                                <img src='assets/icons/money.svg'></img>
                                <h5>Money back</h5>
                                <p>30 days gaurantee</p>
                            </div>
                            <div className="eccard">
                                <img src='assets/icons/lock 01.svg'></img>
                                <h5>Secure Payments</h5>
                                <p>Secured by Stripe</p>
                            </div>
                            <div className="eccard">
                                <img src='assets/icons/call.svg'></img>
                                <h5>24/7 Support</h5>
                                <p>Phone and Email support</p>
                            </div>
                        </div>
                    </div>
                    <div className="sale">
                        <div className="sale-left">
                            <img src='assets/images/Living-room.svg'></img>
                        </div>
                        <div className="sale-right">
                            <p>SALE UPTO 35% OFF</p>
                            <h1>HUNDREDS of <br></br>New lower prices!</h1>
                            <p>It's more affordable than ever to give <br></br> every room in your home a stylish makeover</p>
                            <div className="button">
                                <CustomButton name='Shop now' href='/shop'></CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className="Articles">
                        <div className="Articles-heading">
                            <h1>Articles</h1>
                            <CustomButton name="More Products"/>
                        </div>
                        <div className="Articles-content">
                        <div className="new-article-item">
                                <div>
                                    <div className="article-img-div">
                                        <img src='assets/images/Living-room.svg'></img>
                                    </div>
                                    <div className="item-details">
                                    <strong>7 Ways to decor your home</strong>
                                    <div>
                                        <CustomButton name='Read More'/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        <div className="new-article-item">
                                <div>
                                    <div className="article-img-div">
                                        <img src='assets/images/Kitchen.svg'></img>
                                    </div>
                                    <div className="item-details">
                                    <strong>Kitchen organization</strong>
                                    <div>
                                        <CustomButton name='Read More'/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        <div className="new-article-item">
                                <div>
                                    <div className="article-img-div">
                                        <img src='assets/images/Bedroom-messy.svg'></img>
                                    </div>
                                    <div className="item-details">
                                    <strong>Decor your bedroom</strong>
                                    <div>
                                        <CustomButton name='Read More'/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transitions>

            </div>
        </div>

    );
}