/* dependencies */
import axios from 'axios';
import { useState } from 'react';

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

        const textarea = document.getElementById('messageField');

        const formData = new FormData();
        formData.append('apikey', process.env.REACT_APP_APIKEY);
        formData.append('nom', e.target[0].value);
        formData.append('note', currentValue);
        formData.append('message', textarea.value);
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
                
                <div className='commentFormField commentFormFieldStarField'>

                    <label htmlFor="noteField"  className='formLabel'>Note</label>
                        
                    <div className='rating'>
                        <label className="rating-label">
                            <input type="radio" name="stars" value="1" onChange={handleChange}/>
                            <span className="icon">★</span>
                        </label>

                        <label>
                            <input type="radio" name="stars" value="2" onChange={handleChange}/>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="3" onChange={handleChange}/>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>   
                        </label>
                        <label>
                            <input type="radio" name="stars" value="4" onChange={handleChange}/>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="5" onChange={handleChange}/>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                    </div>
 
                    <p>{currentValue}</p>
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