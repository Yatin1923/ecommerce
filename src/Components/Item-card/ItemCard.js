import './ItemCard.css';
import StarRating from "../../Components/StarRating/StarRating";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../Redux/action';

 function ItemCard(props){
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
      const handleAddToCart = () => {
        // Dispatch the addToCart action with the item details
        props.addToCart({
          name: props.name,
          price: props.price,
          // Add other item details as needed
        });
      };
    
    return(
        <div className="item" >
        <div >
            <div className='img-div '>
            <Link to='/products' className="item-link">
                <img src={props.image} alt='image test' />
    </Link>
                <div className='labels'>
                    <div className="label">
                        <span>{props.new?'NEW' : ''}</span>
                    </div>
                    <div className="label green">
                        <span>{props.discount? '-'+props.discount +'%':''}</span>
                    </div>
                </div>
                <IconButton aria-label="Favourite" className="favouriteBtn">
                    <FavoriteBorderOutlinedIcon/>
                </IconButton>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="AddToCartBtn"  onClick={handleAddToCart}> Add to cart</Button>
                </ThemeProvider>
           
            </div>
            <Link to='/products' className="item-link">
           
            <div className="item-details">
                <StarRating value={props.rating}/>
                <strong>{props.name}</strong>
                <div>
                    <strong>{'$'+props.price}</strong><s className="oldprice"> {props.oldprice? '$'+props.oldprice:''}</s>
                </div>
            </div>
    </Link>
        </div>
    </div>

    )
}

export default connect(null, { addToCart })(ItemCard);