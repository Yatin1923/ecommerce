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
import { Provider, useDispatch } from 'react-redux';
import store from './Redux/store';
import SignUp from './Pages/SignUp/SignUp';
import { Toaster } from 'react-hot-toast';
import Cart from './Pages/Cart/Cart';
import { loadCartAsync } from './Redux/reducers';
import { jwtDecode } from 'jwt-decode';
import MyAccount from './Pages/MyAccount/myAccount';
const Layout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    try{
      const decodedToken:any = jwtDecode(localStorage.getItem('JWTToken')??'');
      dispatch(loadCartAsync(decodedToken.UserId))
      if (!localStorage.getItem('JWTToken')) {
        navigate('/signup');
      }
    }catch(error){
      console.error("Error occured while fetching token: ",error)
    }
    },[])
  const location = useLocation();
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  }
  return (
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
                  <Route path='/cart' element={<Cart />} />
                  <Route path='products' element={<Products />} />
                  <Route path='shop' element={<Shop />} />
                  <Route path='contact' element={<Contact />} />
                  <Route path='myAccount' element={<MyAccount />} />
                </Routes>
              </div>
              {location.pathname != '/myAccount'?<><Newsletter/></>:<></>}
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
  );
};

export default Layout;
