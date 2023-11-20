import './Navbar.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink, useLocation } from 'react-router-dom';

// const CustomLink = styled(Link)`
//  background-color: #4CAF50;
//  border: none;
//  color: white;
//  padding: 10px 20px;
//  text-align: center;
//  text-decoration: none;
//  display: inline-block;
//  font-size: 16px;
//  margin: 4px 2px;
//  cursor: pointer;
// `;
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000',
//     },
//   },
// });

 

export default function Navbar(){
 let [isSticky, setSticky] = React.useState(false);
let [isScrollDown, setHeight] = React.useState(false);
let lastScrollTop =0;
React.useEffect(()=>{
    const handleScroll = () => {
        const isScrollingDown =window.scrollY>lastScrollTop;
        lastScrollTop = window.scrollY;
        setHeight(isScrollingDown)
       
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
},[])
    return(
        <div className='container'>

          <div className={`ecnavbar container ${isScrollDown?'heightAdj':''}`}>
            <div className='eclogo'>
              <h2>3legant</h2>
            </div>
              <div className='navButtons'>
                  {/* <NavLink to='/' className={activeButton === 'HOME' ?'ecactive navBtn':'navBtn'} onClick={changeActiveState}>HOME</NavLink>
                  <NavLink to='/shop' className={activeButton === 'SHOP' ?'ecactive navBtn':'navBtn'} onClick={changeActiveState}>SHOP</NavLink>
                  <NavLink to='/products' className={activeButton === 'PRODUCT' ?'ecactive navBtn':'navBtn'} onClick={changeActiveState} >PRODUCT</NavLink>
                  <NavLink to='/contact' className={activeButton === 'CONTACT US' ?'ecactive navBtn':'navBtn'} onClick={changeActiveState}>CONTACT US</NavLink> */}
                 
                  <NavLink to='/' className='navBtn' >HOME</NavLink>
                  <NavLink to='/shop' className='navBtn' >SHOP</NavLink>
                  <NavLink to='/products' className='navBtn'  >PRODUCT</NavLink>
                  <NavLink to='/contact' className='navBtn' >CONTACT US</NavLink>

                  {/* <NavLink to='/' className= 'HOME' >HOME</NavLink>
                  <NavLink to='/shop' className= 'SHOP' >SHOP</NavLink>
                  <NavLink to='/products' className= 'PRODUCT'>PRODUCT</NavLink>
                  <NavLink to='/contact' className= 'CONTACavBtn'>CONTACT US</NavLink> */}
              </div>
              <div className='navIcons'>
                  <IconButton aria-label="delete">
                      <SearchOutlinedIcon/>
                  </IconButton>
                  <IconButton aria-label="delete">
                      <AccountCircleOutlinedIcon/>
                  </IconButton>
                  <IconButton aria-label="delete">
                      <ShoppingBagOutlined/>
                  </IconButton>
              </div>
          </div>
        </div>


    
    
    )
};