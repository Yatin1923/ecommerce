import './Navbar.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector} from 'react-redux'




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      top: 5,
      backgroundColor:'black',
      color:'white',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
export default function Navbar(props){
let totalCartItems = useSelector((state:any)=>state.cart.length);
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
                <StyledBadge badgeContent={totalCartItems}>
                    <IconButton onClick={props.toggleDrawer} >
                        <ShoppingBagOutlined/>
                    </IconButton>
                </StyledBadge>
            </div>
          </div>
           
        </div>


    
    
    )
};