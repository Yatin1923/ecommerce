import * as React from 'react';
import './CartItem.css';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';


import Box from '@mui/material/Box';
import Quantity from '../Quantity/Quantity';

export default function CartItem(props){
    return(
        <div>
        <Box display='flex' gap='1vw' height='10vw' paddingTop={2}>
            <div className='ci_image'>
                <img src={props.image}></img>
            </div>
            <div className='ci_itemContent'>
                <div>
                    <strong>{props.name}</strong>
                    <p>Color: {props.color}</p>
                    <Quantity quantity={props.quantity}></Quantity>
                </div>
                <div>
                    <strong>${Number(props.price)}</strong>
                    <div>
                        <IconButton>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>
                </div>
            </div>
        </Box>
        <Divider className='divider'></Divider>
        </div>
    )
}