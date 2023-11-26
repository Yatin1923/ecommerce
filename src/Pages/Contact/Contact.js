import { useEffect } from 'react';
import Transitions from '../../Components/Transition/Transition'
import './Contact.css'
import CustomButton from '../../Components/Button/CustomButton';
export default function Contact(){
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return(
       
        <div className="container">
            <Transitions>
                <div className='contact-heading'>
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
                                <h3>ADDRESS</h3>
                                <span>234 Hai Trieu, Ho Chi Minh City, Viet Nam</span>
                            </div>
                            <div className='contact-card'>
                                <img src='assets/icons/call.svg'></img>
                                <h3>CONTACT US</h3>
                                <span>234 Hai Trieu, Ho Chi Minh City, Viet Nam</span>
                            </div>
                            <div className='contact-card'>
                                <img src='assets/icons/mail.svg'></img>
                                <h3>EMAIL</h3>
                                <span>234 Hai Trieu, Ho Chi Minh City, Viet Nam</span>
                            </div>
                    </div>
                </div>
            </Transitions>
        </div>
    )
}