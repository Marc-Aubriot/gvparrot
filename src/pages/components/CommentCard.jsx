/* styles */
import './styles/CommentCard.css';

// component une card contenant un avis
const CommentCard = (props) => {
    return (
        <div className={props.lsOnly === "false"?  "commentCardBox" : "commentCardBox hideCard" }>
            <p>{props.nom}</p>
            <p>{props.rating}</p>
            <p>{props.comment}</p>
        </div>
    )
}

export default CommentCard;