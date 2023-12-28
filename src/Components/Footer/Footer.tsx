import React from 'react';
import './Footer.css';
export default function Footer(){

   
    return(
        <div>
            <div className="main">
                <div className="container">
                    <div className="footer">

                        <div className="logo">
                            <h2>3legant.</h2>
                            <p>|</p>
                            <p>Gift & Decorations</p>
                        </div>
                        <div className="buttons">
                                <a href="#" >HOME</a>
                                <a href="#" >SHOP</a>
                                <a href="#" >PRODUCT</a>
                                <a href="#" >CONTACT US</a>
                        </div>
                        
                    </div>
                    <hr className="horizontalLine"></hr>
                    <div className="d-flex justify-content-between">
                        <div className="copyright">
                            <p>Copyright © 2023 3legant. All rights reserved</p>
                            <strong>Privacy policy</strong>
                            <strong>Terms of Use</strong>
                        </div>
                        <div className="social-handlers">
                            <a href="#">
                                <img src='assets/icons/instagram.svg'></img>
                            </a>
                            <a href="#">
                                <img src='assets/icons/facebook.svg'></img>
                            </a>
                            <a href="#">
                                <img src='assets/icons/youtube.svg'></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}