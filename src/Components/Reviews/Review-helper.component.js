import StarRating from "../../Components/StarRating/StarRating";
import './Review-helper.component.css';
export default function Review_Helper(props){
    return (
        <div className="review-helper">
            <div className="profile-image">
            <img src={props.img}></img>
            </div>
            <div className="review-content">
                <div className="review-name">
                    <span>{props.name}</span>
                </div>
                <StarRating value={props.rating}></StarRating>
                <div className="review-text">
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}