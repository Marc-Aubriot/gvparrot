/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* components */
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

/* styles */
import './styles/CommentForm.css';
import Bouton from './Bouton';

// component un formulaire de commentaire qui sera envoyé en BDD
const CommentForm = (props) => {
    // hooks envoit du formulaire
    const [commentSendTrue, setCommentSendTrue] = useState(false);
    const [currentValue, setCurrentValue] = useState(5);
    // hook fonctionnel
    const [response, setResponse] = useState([]);

    // envoit le commentaire en BDD
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue(true);

        const formData = new FormData();
        formData.append('apikey', process.env.REACT_APP_APIKEY);
        formData.append('nom', e.target[0].value);
        formData.append('note', e.target[1].value);
        formData.append('message', e.target[2].value);
        formData.append('action', 'sendComment');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    // hook la value du range
    const handleChange = e => {
        e.preventDefault();

        setCurrentValue(e.target.value);
    };

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

    // render le formulaire
    return(
        <div className='pageAccueilformWrapper'>
            {
                response ?
                <p className='responseText'>{response}</p>
                :
                ''
            }

            <form onSubmit={sendForm} className='pageAccueilForm'>

                <div className='commentFormField'>
                    <label htmlFor="nameField" className='formLabel'>Nom</label>
                    <br />
                    <input id='nameField' name='nameField' type='text' placeholder='Nom' className='formInput' required />
                </div>
                
                <div className='commentFormField'>
                    <label htmlFor="noteField"  className='formLabel'>Note</label>
                    <br />
                    <div className='commentFormFieldInputRange'>
                        <div className='commentFormInputRangeInputWrapper'>                        
                            <input
                                id='noteField' 
                                name='noteField'
                                className="formInputRange"
                                type="range"
                                defaultValue={5}
                                min={0}
                                max={5}
                                step={0.5}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='commentFormStarWrapper'>
                            {
                                popStart(currentValue)
                            } 
                        </div>

                        <p className="commentFormInputRangeDetail">{currentValue}</p>   
                    </div>
                </div>

                <div className='commentFormField'>
                    <label htmlFor="messageField"  className='formLabel'>Message</label>
                    <br />
                    <input id='messageField' name='messageField' type='text' placeholder='Message' className='formInput' required />
                </div>

                {
                    commentSendTrue ?
                    ""
                    :
                    <div className='commentFormSubmitBtnWrapper'>
                        <button type='submit' className='commentFormSubmitBtn'>Envoyer</button>
                    </div>
                }
                
            </form> 


            <div className='commentFormBtnWrapper'>
                <Bouton type='button' text='retour aux avis' onClick={props.toggle}/>
            </div>

            
        </div>
    )
};

export default CommentForm;