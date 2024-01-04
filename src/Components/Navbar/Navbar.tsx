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
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { red } from '@mui/material/colors';




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
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
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
                <IconButton onClick={handleClick} size="small">
                    <AccountCircleOutlinedIcon/>
                </IconButton>
                <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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