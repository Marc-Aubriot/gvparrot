/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* styles */
import './styles/CommentForm.css';
import Bouton from './Bouton';

/* components */


const CommentForm = (props) => {
    /* hooks des datas fetch par axios */
    const [commentSendTrue, setCommentSendTrue] = useState([]);
    const [response, setResponse] = useState([]);

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue();

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('note', e.target[1].value);
        formData.append('message', e.target[2].value);
        formData.append('action', 'sendComment');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    return(
        <div className='pageAccueilformWrapper'>
            {
                commentSendTrue ? 
                <form onSubmit={sendForm} className='pageAccueilForm'>

                    <div className='commentFormField'>
                        <label for="nameField" className='formLabel'>Nom</label>
                        <br />
                        <input id='nameField' name='nameField' type='text' placeholder='Nom' className='formInput'></input>
                    </div>
                    
                    <div className='commentFormField'>
                        <label for="noteField"  className='formLabel'>Note</label>
                        <br />
                        <input id='noteField' name='noteField' type='text' placeholder='Note de 1 à 5' className='formInput'></input>
                    </div>

                    <div className='commentFormField'>
                        <label for="messageField"  className='formLabel'>Message</label>
                        <br />
                        <input id='messageField' name='messageField' type='text' placeholder='Message' className='formInput'></input>
                    </div>

                    <div className='commentFormSubmitBtnWrapper'>
                        <button type='submit' className='commentFormSubmitBtn'>Envoyer</button>
                    </div>
                    
                </form> 
            :
                <p className='responseText'>{response}</p>
            }

            <div className='commentFormBtnWrapper'>
                <Bouton type='button' text='retour aux avis' onClick={props.toggle}/>
            </div>
            
        </div>
    )
};

export default CommentForm;