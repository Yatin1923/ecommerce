import Carousel from 'react-bootstrap/Carousel';
import React from'react';
import './Carousel.css';
function CustomCarousel() {
  return (
    <Carousel data-bs-theme="dark" className='eccarousel'>
      <Carousel.Item>
        <img
          className=""
          src='assets/images/Living-room.svg'  
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=""
          src='assets/images/Living-room-2.svg'
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=""
          src='assets/images/Living-room-3.svg'
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;