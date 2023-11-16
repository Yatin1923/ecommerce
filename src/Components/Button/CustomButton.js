import { Link } from 'react-router-dom';
import './CustomButton.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function CustomButton(props){
    return(
        <Link to={props.href}>
        <button className='customButton'>
            {props.name +' '}
             <ArrowForwardIcon className='svgIcon'/>
        </button>
        </Link>
    )
}