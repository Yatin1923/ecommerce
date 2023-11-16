import { useEffect } from 'react';
import Transitions from '../../Components/Transition/Transition'
import './Contact.css'
export default function Contact(){
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return(
       
        <div className="container">
            <Transitions>
                <h1>Contact page</h1>
            </Transitions>
        </div>
    )
}