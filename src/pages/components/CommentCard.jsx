import '../styles/CommentCard.css';

const CommentCard = (props) => {
    return (
        <div className="commentCardBox">
            <p>{props.nom}</p>
            <p>{props.rating}</p>
            <p>{props.comment}</p>
        </div>
    )
}

export default CommentCard;