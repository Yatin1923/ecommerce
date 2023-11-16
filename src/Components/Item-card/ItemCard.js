import './ItemCard.css';
import StarRating from "../../Components/StarRating/StarRating";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function ItemCard(props){
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000',
          },
        },
      });
    return(
        <div className="item">
        <div>
            <div className='img-div '>
                <img src={props.image} alt='image test' />
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
                    <Button variant="contained" className="AddToCartBtn"> Add to cart</Button>
                </ThemeProvider>
            </div>
            <div className="item-details">
                <StarRating value={props.rating}/>
                <strong>{props.name}</strong>
                <div>
                    <strong>{'$'+props.price}</strong><s className="oldprice"> {props.oldprice? '$'+props.oldprice:''}</s>
                </div>
            </div>
        </div>
    </div>
    )
}