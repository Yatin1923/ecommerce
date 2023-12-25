import './App.css';
import CustomCarousel from './Components/Carousel/Carousel';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Products from './Pages/Products/Products';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Newsletter from './Components/Newsletter/Newsletter';
import Shop from './Pages/Shop/Shop';
import Contact from './Pages/Contact/Contact';
import { AnimatePresence } from "framer-motion";
import FlyOutCart from './Components/FlyOutCart/FlyOutCart';
import { Provider } from 'react-redux';
import store from './Redux/store';
function App() {
  const [isDrawerOpen,setDrawerOpen] = React.useState(false);


const toggleDrawer =  ()=>{
  setDrawerOpen(!isDrawerOpen);
}
 return (
  <Provider store={store}>

    <div className="App">
      <AnimatePresence>

        <Router>
        <Navbar toggleDrawer = {toggleDrawer}/>
        <div>
          <FlyOutCart isOpen={isDrawerOpen} toggleDrawer = {toggleDrawer}/>
        </div>
         <div className='routes'>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='shop' element={<Shop />} />
            <Route path='contact' element={<Contact />} />
          </Routes>
          
         </div>
        <Newsletter/>
        <Footer/>
        </Router>
      </AnimatePresence>

    </div>
  </Provider>

 );
}

export default App;