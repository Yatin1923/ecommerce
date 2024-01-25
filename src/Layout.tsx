// Layout.js
import './App.css';
import CustomCarousel from './Components/Carousel/Carousel';
import Navbar from './Components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Products from './Pages/Products/Products';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Newsletter from './Components/Newsletter/Newsletter';
import Shop from './Pages/Shop/Shop';
import Contact from './Pages/Contact/Contact';
import { AnimatePresence } from "framer-motion";
import FlyOutCart from './Components/FlyOutCart/FlyOutCart';
import { Provider } from 'react-redux';
import store from './Redux/store';
import SignUp from './Pages/SignUp/SignUp';
import { Toaster } from 'react-hot-toast';
const Layout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('JWTToken')) {
      navigate('/signup');
    }
  },[])
  const location = useLocation();
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <AnimatePresence>
          {location.pathname == '/signup' ? <Routes><Route path='/signup' element={<SignUp />} /></Routes> :
            <>
              <Navbar toggleDrawer={toggleDrawer} />
              <div>
                <FlyOutCart isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
              </div>
              <div className='routes'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='products' element={<Products />} />
                  <Route path='shop' element={<Shop />} />
                  <Route path='contact' element={<Contact />} />
                </Routes>
              </div>
              <Newsletter />
              <Footer />
            </>
          }
          <Toaster key={1} position="top-center" toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff'
            }
          }} />
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default Layout;
