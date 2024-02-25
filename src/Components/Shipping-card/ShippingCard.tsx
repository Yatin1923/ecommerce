import React from "react";
import './ShippingCard.css'
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
export default function ShippingCard(props){
    let shippingCost = props.name.includes('Free')?'$0.00':'$21.99'
    return(
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        >
        <div className="shipping-card-container">
            <FormControlLabel value={props.name} control={<Radio />} label={props.name} />
            <div className="shipping-cost">
                {shippingCost}
            </div>
        </div>
        </RadioGroup>
    )
}