import { useEffect } from "react";
import Transitions from "../../Components/Transition/Transition";
import { ScrollRestoration } from "react-router-dom";

export default function Shop(){
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return(
        <div className="container">
            <Transitions>

            <h1>Shop page</h1>
            </Transitions>
        </div>
    )
}