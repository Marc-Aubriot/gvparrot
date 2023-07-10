/* components */
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

/* styles */
import './styles/CommentCard.css';

// component une card contenant un avis
const CommentCard = (props) => {
    //props.rating

    // affiche un nombre d'étoile pleine en fonction du rating
    const popStart = (rating) => {
        if ( rating / 0.5 === 10 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /></>
            )
        } else if ( rating / 0.5 === 9 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /></>
            )
        } else if ( rating / 0.5 === 8 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /></>
            )
        } else if ( rating / 0.5 === 7 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /></>
            )
        } else if ( rating / 0.5 === 6 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 5 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 4 ) {
            return (
                <><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 3 ) {
            return (
                <><BsStarFill /><BsStarHalf /><BsStar /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 2 ) {
            return (
                <><BsStarFill /><BsStar /><BsStar /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 1 ) {
            return (
                <><BsStarHalf /><BsStar /><BsStar /><BsStar /><BsStar /></>
            )
        } else if ( rating / 0.5 === 0 ) {
            return (
                <><BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></>
            )
        }
    }

    return (
        <div className={props.lsOnly === "false"?  "commentCardBox" : "commentCardBox hideCard" }>

            <p>{props.nom}</p>

            <p>
                {
                    popStart(props.rating)
                } 
                
                <span className='ratingInt'>{props.rating}</span>
            </p>

            <p>"{props.comment}"</p>
             
        </div>
    )
}

export default CommentCard;