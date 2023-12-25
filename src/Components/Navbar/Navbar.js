import './Navbar.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from 'react-router-dom';
import FlyOutCart from '../FlyOutCart/FlyOutCart';

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

 
// const toggleDrawer =
//     (open: boolean) =>
//     (event: ) => {
//       if (
//         event.type === 'keydown' &&
//         ((event as React.KeyboardEvent).key === 'Tab' ||
//           (event as React.KeyboardEvent).key === 'Shift')
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

export default function Navbar(props){
let [isShowNav, setShowNav] = React.useState(true);
let lastScrollTop =0;
React.useEffect(()=>{
    const handleScroll = () => {
        const isScrollingDown =window.scrollY>lastScrollTop;
        lastScrollTop = window.scrollY;
        setShowNav(!isScrollingDown);
    };
    const handleMouseMove = (event)=>{
        if(event.clientY<25){
            setShowNav(true);
        }
    };    
    window.addEventListener('mousemove',handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
},[]);
    return(
        <div className='container'>

          <div className={`ecnavbar container ${isShowNav?'':'heightAdj'}`}>
            <div className='eclogo'>
              <h2>3legant</h2>
            </div>
            <div className='navButtons'>
                <NavLink to='/' className='navBtn' >HOME</NavLink>
                <NavLink to='/shop' className='navBtn' >SHOP</NavLink>
                <NavLink to='/products' className='navBtn'  >PRODUCT</NavLink>
                <NavLink to='/contact' className='navBtn' >CONTACT US</NavLink>
            </div>
            <div className='navIcons'>
                <IconButton >
                    <SearchOutlinedIcon/>
                </IconButton>
                <IconButton >
                    <AccountCircleOutlinedIcon/>
                </IconButton>
                <IconButton onClick={props.toggleDrawer}>
                    <ShoppingBagOutlined/>
                </IconButton>
            </div>
          </div>
           
        </div>


    
    
    )
};