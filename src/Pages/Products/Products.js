import { useEffect } from "react";
import Transitions from "../../Components/Transition/Transition";

export default function Products(){
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <div className="container"> 
        <Transitions>
            <h1>Product page</h1>
        </Transitions>
        </div>
    )
}