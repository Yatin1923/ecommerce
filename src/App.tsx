import './App.css';
import CustomCarousel from './Components/Carousel/Carousel';
import Navbar from './Components/Navbar/Navbar';
import React, { useState } from 'react';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Products from './Pages/Products/Products';
import { BrowserRouter as Router, Routes, Route,useLocation, useNavigate } from 'react-router-dom';
import Newsletter from './Components/Newsletter/Newsletter';
import Shop from './Pages/Shop/Shop';
import Contact from './Pages/Contact/Contact';
import { AnimatePresence } from "framer-motion";
import FlyOutCart from './Components/FlyOutCart/FlyOutCart';
import { Provider } from 'react-redux';
import store from './Redux/store';
import SignUp from './Pages/SignUp/SignUp';
import Layout from './Layout';
function App() {
  const [isDrawerOpen,setDrawerOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

const toggleDrawer =  ()=>{
  setDrawerOpen(!isDrawerOpen);
}

 return (
   <Router>
  <Layout></Layout>
 </Router>
 );

}

export default App;